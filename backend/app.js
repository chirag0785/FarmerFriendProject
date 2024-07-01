const express=require('express');
const mongoose = require('mongoose');
const app=express();
const path=require('path');
const cors=require('cors');
const {createServer}=require('http');
const cropRouter=require('./routes/crop');
const weatherRouter=require('./routes/weather');
const userRouter=require('./routes/user');
const roomRouter=require('./routes/room');
const cookieParser=require('cookie-parser');
const {Server}=require('socket.io');
require('dotenv').config()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3001',
    credentials: true
}))
app.use('/crops',cropRouter);
app.use('/getweather',weatherRouter);
app.use('/user',userRouter);
app.use('/room',roomRouter);
const httpServer=createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3001',
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.on('joinroom', ({ room }) => {
        socket.join(room);
    });

    socket.on('leaveroom', ({ room }) => {
        socket.leave(room);
    });

    socket.on('newmsg', ({ msg, room }) => {
        io.to(room).emit('newchat', { msg });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
const PORT=3000;
mongoose.connect('mongodb://127.0.0.1:27017/FarmerDB')
.then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})