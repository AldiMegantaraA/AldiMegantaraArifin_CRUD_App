const mongoose = require('mongoose');

var schem = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    accountNumber:{
        type:Number,
        required:true
    },
    emailAdress:{
        type:String,
        required:true
    },
    identityNumber:{
        type:Number,
        required:true
    },
    status:String
})

const UserDB = mongoose.model('aldimegantaraarifin', schem);

module.exports=UserDB;