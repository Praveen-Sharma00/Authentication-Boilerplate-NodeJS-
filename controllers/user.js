const User= require('../models/User')
const bcrypt = require('bcryptjs')

exports.profile = async(req,res)=>{
    console.log(req.session.user)
    res.render('profile')
}