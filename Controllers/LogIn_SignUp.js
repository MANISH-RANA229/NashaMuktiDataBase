const bcrypt = require("bcrypt");
const User = require("../Models/SignUp");
const OTP = require("../Models/OTP");

const jwt = require("jsonwebtoken");
const { options } = require("../Routes/Routes");
require("dotenv").config();

//signup route handler
exports.signup = async (req,res) => {
    try{
        //get data
       
        const { Name,email,Password,city,state,MobileNumber,Gender,DOB,AddictionYears,otp} = req.body;
        
        //check if user already exist
        const existingUser = await User.findOne({email});
        

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

     // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    console.log(response)
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
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

       
        const {email, Password} = req.body;
        console.log(req.body);
     
      
        if(!email || !Password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        let user = await User.findOne({email});
       
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
        console.log(payload);
        console.log(user.Password);
        //verify password & generate a JWT token
        if(await bcrypt.compare(Password,user.Password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                console.log("hello");

            user = user.toObject();
            user.token = token;
            user.Password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                secure: true, 
                sameSite:'None'

            }

            res.cookie("token", token, options);
            //now redirect to adminhome page
            if(user.role === "Admin") {
            res.redirect('http://localhost:3000/api/v1/AdminHome')
            }
           
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
