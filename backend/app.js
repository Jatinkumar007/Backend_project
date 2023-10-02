const express=require('express');
const app=express();
const authRouter=require('./route/authRoute');
const databaseconnect=require('./config/databaseConfig');
const cookieParser=require('cookie-parser');
const cors=require('cors');

databaseconnect();

app.use(cors({                                                                                 //<----- add this complete
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/',authRouter)

module.exports=app;