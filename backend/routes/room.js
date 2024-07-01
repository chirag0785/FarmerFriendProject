const express=require('express');
const router=express.Router();
const Room=require('../models/room');
router.get('/getrooms',async (req,res,next)=>{
    try{
        const rooms=await Room.find();
        return res.status(200).json({rooms});
    }catch(err){
        res.status(500).json({msg:"Internal Server error"});
    }
})

router.post('/addroom',async (req,res,next)=>{
    const {name,description}=req.body;
    try{
        const room=await Room.create({
            name,
            description
        })
        return res.status(200).json({room});
    }catch(err){
        return res.status(500).json({msg:"Internal Server error"});
    }
})

router.post('/addMsg',async (req,res,next)=>{
    const {msg,_id}=req.body;
    try{
        let room=await Room.findOne({_id});
        room.messages.push(msg);
        await room.save();

        room=await Room.findOne({_id});
        res.status(200).json({room});
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"});
    }
})
module.exports=router