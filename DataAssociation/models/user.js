const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/associationDB')

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,      //ObjectID
            ref:'post'
        }
    ]
})

module.exports =  mongoose.model('user',userSchema)
