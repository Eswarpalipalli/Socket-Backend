import express from 'express';
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});

const port = 3000;

io.on('connection',(socket)=>{
    console.log("User Connected");
    socket.on('message', (message)=>{
        console.log(message);
        io.emit('message',`${socket.id.slice(0,2)} : ${message}`);
    });
    socket.on('disconnect',()=>{
        console.log("User Disconnected");
    });
});


httpServer.listen(port,()=>{
    console.log(`Server Listening on port ${port}`);
})
