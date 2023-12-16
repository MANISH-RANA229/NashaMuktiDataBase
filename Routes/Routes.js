const express = require("express");
const router = express.Router();


const {signup,login} = require("../Controllers/LogIn_SignUp");
const {auth, isAdmin,isUser,isBoth} = require("../Middleware/auth");
const{addCenter,centreList}=require("../Controllers/AddCenters");
const{addExpert,expertList}=require("../Controllers/Expertt");
const {addProfile,profileList} = require("../Controllers/Profile");

router.post("/login", login);
router.post("/signup", signup);
router.post("/addCenter",auth ,isAdmin,addCenter);
router.get("/centreList",auth,centreList);
router.post("/addExpert",auth,isAdmin,addExpert);
router.get("/expertList",auth,expertList);
router.post("/addProfile",auth,isAdmin,addProfile);
router.get("/profileList",auth,isAdmin,profileList);



//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

 //Protected Route
router.get("/Admin", auth, isAdmin, (req,res) => {
     res.json({
         success:true,
         message:'Welcome to the Protected route for Admin',
     });
 } );

 router.get("/user", auth, isUser, (req,res) => {
     res.json({
         success:true,
         message:'Welcome to the Protected route for user',
     });
 });



 

   



module.exports = router;




// router.get("/expertCitiesBy/:city", (req,res) => {

//     const {city} = req.params;
//     //find expert

//     res.json({
//         success:true,
//         message:'Welcome to the Protected route for Admin',
//     });
// } );