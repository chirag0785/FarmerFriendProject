const express=require('express');
const mongoose = require('mongoose');
const app=express();
const path=require('path');
const cors=require('cors');
const cropRouter=require('./routes/crop');
const weatherRouter=require('./routes/weather');
const userRouter=require('./routes/user');
const cookieParser=require('cookie-parser');
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
const PORT=3000;
mongoose.connect('mongodb://127.0.0.1:27017/FarmerDB')
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})