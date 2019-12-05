const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

// const User= require('./models/User')
dotenv.config({
    path: './config.env'
});

const app = express()
require('./dbCon')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
// app.get('/',async (req,res)=>{
//     await User.create({
//     })
//     res.send('done')
// })
const store = new MongoDBStore({
    uri:URL,
    collection:'sessions'
})
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'CloudSurfer',
    store:store
}))


app.set('view engine','ejs')
app.set('views',`${__dirname}/public/views`)

app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.user = req.session.user
    next()
})
app.use(authRoutes)
app.use(userRoutes)

app.listen(3000, () => {
    console.log('Server running !')
})