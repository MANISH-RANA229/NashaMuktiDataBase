const bcrypt = require("bcrypt");
const User = require("../Models/SignUp");

const jwt = require("jsonwebtoken");
const { options } = require("../Routes/Routes");
require("dotenv").config();

//signup route handler
exports.signup = async (req,res) => {
    try{
        //get data
       
        const { Name,email,Password,MobileNumber,Gender,DOB,AddictionYears} = req.body;
        console.log(req.body);
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try {
            if (!Password) {
                throw new Error('Password is missing or undefined.');
            }
        
            hashedPassword = await bcrypt.hash(Password, 10);
        } catch (err) {
            console.error('Error in hashing password:', err.message);
        
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password',
                error: err.message
            });
        }
        

        //create entry for User
        const user = await User.create({
            Name,email,MobileNumber,Gender,DOB,AddictionYears,Password:hashedPassword
        })
        console.log(user);

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}

//login
exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, Password} = req.body;
     
        //validation on email and password
        if(!email || !Password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(Password,user.Password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                

            user = user.toObject();
            user.token = token;
            user.Password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                secure: true, 
                sameSite:'None'

            }

            res.cookie("token", token, options)
            res.status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
           
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}
