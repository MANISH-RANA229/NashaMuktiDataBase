const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../Models/SignUp");

exports.auth = (req,res, next) => {
    try{
         
            console.log("cookie" , req.cookies);
          
            const token = req.cookies.token;

           

       
            if(!token || token === undefined) {
                return res.status(401).json({
                    success:false,
                    message:'Token Missing',
                });
            }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this ?
            req.user = payload;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        console.log(error);
        return res.status(401).json({
           
            success:false,
            message:'Something went wrong, while verifying4 the token',
        });
    }
   
}

exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.role !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isUser = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.role !== "user") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};


