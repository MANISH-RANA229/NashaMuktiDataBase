const TotalUser=require('../models/Person');
const{options}=require('../routes/routes');


//show total no.of users on home page by count in db collection
exports.totalUsers=async(req,res)=>{
    try{
        const totalUsers=await TotalUser.countDocuments();
        return res.status(200).json({
            success:true,
            totalUsers
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Cannot get total users",
            error:error.message
        });
    }
}

