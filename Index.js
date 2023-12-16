const express= require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());


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


