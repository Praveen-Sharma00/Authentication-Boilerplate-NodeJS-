const User= require('../models/User')
const bcrypt = require('bcryptjs')

exports.login = async(req,res)=>{
    res.render('login')
}

exports.postLogin = async(req,res)=>{
    const email = req.body.email
    const givenPassword = req.body.password
    const _anyUser =  await User.findOne({
        email:email
    })
    if(_anyUser){
        const isValid = await bcrypt.compare(givenPassword,_anyUser.password)
        if(isValid){
            req.session.user = _anyUser
            req.session.isLoggedIn = true
            req.session.save((err)=>{
               if(err){
                   console.log('Error saving session')
                   process.exit()
               }
            })
            return res.redirect('/profile')
        }      
    }
    return res.send('Sorry Invalid Credentials')
}

exports.signup = async(req,res)=>{
    res.render('signup')
}

exports.postSignup = async(req,res)=>{
    const _anyUser = await User.findOne({
        email:req.body.email
    })

    if(!_anyUser){
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save()
        return res.redirect('/')
    }else{
        res.send({
            error:"User already exists"
        })  
    }
}

exports.logout = async (req,res)=>{
    req.session.destroy((err)=>{
        console.log(err)
    })
    return res.redirect('/')
}