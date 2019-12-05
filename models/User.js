const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})
userSchema.pre('save',async function(next){
    const user=this
    if(this.isModified('password')){
        user.password = await bcrypt.hash(user.password,12)
    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports=User