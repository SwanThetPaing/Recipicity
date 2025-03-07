const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const recipesRoutes = require('./routes/recipes');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const cron = require('node-cron');
const User = require('./models/User');
const sendEmail = require('./helpers/sendEmail');

const app = express();
app.use(express.static('public'))
const mongoURL = "mongodb+srv://SwanThetPaing:mongodbpp1234@mern.m3lcg.mongodb.net/?retryWrites=true&w=majority&appName=MERN"
mongoose.connect(mongoURL).then(() => {
    console.log('connected to db');
    app.listen(process.env.PORT,() => {
        console.log('app is running on localhost:'+process.env.PORT);
        cron.schedule('*/4 * * * * *',async () => {
           let user = await User.findByIdAndUpdate('67aa19385bf4547b233c51c7', {
                name : "Orange"+Math.random()
           });
        });
    })
});
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
));//local development --WARNING---
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req,res) => {
    return res.json({hello : 'world'});
});

app.use('/api/recipes',AuthMiddleware,recipesRoutes)
app.use('/api/users',usersRoutes)

app.get('/set-cookie',(req,res) => {
    // res.setHeader('Set-Cookie','name=hlaingminthan');
    res.cookie('name','Orange');
    res.cookie('important-key','value', {httpOnly : true});
    return res.send('cookie already set');
})

app.get('/send-email',async (req,res) => {
    try {
        await sendEmail({
            view : 'test',
            data : {
                name : "Apple"
            },
            from : "orange@gmail.com",
            to : "apple@gmail.com",
            subject : "Hello Apple"
        });
        return res.send('email already sent');
    }catch(e){
        return res.status(500).json({
            message : e.message,
            status : 500
        })
    }
})

app.get('/get-cookie',(req,res) => {
    let cookies = req.cookies;
    return res.json(cookies);
})