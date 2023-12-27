const User = require("../Models/StateWise");

const { options } = require("../Routes/Routes");

exports.Stateinfo = async (req, res) => {
    try {
      const {
        
        StateName,
        NoOfCenters,
        TotalUsers,
        ActiveUsers,
        RecoveredUsers,
      } = req.body;
      
  
   
  
      const profile = await User.create({
       
        StateName,
        NoOfCenters,
        TotalUsers,
        ActiveUsers,
        RecoveredUsers,
      });
      
  
      console.log(profile);
  
      return res.status(200).json({
        success: true,
        message: "Profile Added Successfully",
        profile,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot add profile",
        error: error.message,
      });
    }
  }

  exports.Statewise = async (req, res) => {
    try {
        const centreList = await User.find();
        return res.status(200).json({
          success: true,
          message: "Statewise data",
          centreList,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Statewise data cannot fetch",
          error: error.message,
        });
      }
    }
  
  