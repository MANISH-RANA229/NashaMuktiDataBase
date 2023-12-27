const express= require("express");
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/signup',express.static(path.join(__dirname,'public/Signup.html')));
app.use('/api/v1/login',express.static(path.join(__dirname,'public/login.html')));
app.use('/api/v1/AdminHome',express.static(path.join(__dirname,'public/AdminHome.html')));
//app.use('/api/v1/sendotp',express.static(path.join(__dirname,'public/otp.html')));
app.use('/api/v1/addProfile',express.static(path.join(__dirname,'public/Regis.html')));
app.use('/api/v1/Stateinfo',express.static(path.join(__dirname,'public/addexper.html')));
app.use('/api/v1/addCenter',express.static(path.join(__dirname,'public/center.html')));


require("dotenv").config();

const PORT = process.env.PORT;

const authroutes = require("./Routes/Routes");

app.use("/api/v1", authroutes);



app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);

})

require("./DataBase/Database").connect();  

app.get("/",(req,res)=>{
    res.send(`<h1>how is it going</h1>`)
})


