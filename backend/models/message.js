const mongoose=require('mongoose');
const {Schema} = mongoose;
const messageSchema=new Schema({
    text:{
        type:String,
        required:true,
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports=mongoose.model('Message',messageSchema);