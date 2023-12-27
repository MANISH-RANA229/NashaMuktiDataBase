const Center = require("../Models/CenterList");
const { options } = require("../Routes/Routes");

//add centre
exports.addCenter = async (req, res) => {
    try {
      const { Name, City, State, RegisteredUsers, ActiveUsers, RecoveredUsers } = req.body;


    

      const existingCenter = await Center.findOne({
        Name,
        City,
        State
      });
      console.log(existingCenter);
  
      if (existingCenter) {
        return res.status(400).json({
          success: false,
          message: "Center with the same details already exists.",
        });
      }


      const center = await Center.create({ Name, City, State, RegisteredUsers, ActiveUsers, RecoveredUsers });
      console.log(center);
      return res.status(200).json({
        success: true,
        message: "Centre Added Successfully",
        center,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot add centre",
        error: error.message,
      });
    }
  }

  //export all centres
exports.centreList = async (req, res) => {
    try {
      const centreList = await Center.find();
      return res.status(200).json({
        success: true,
        message: "List of Centres",
        centreList,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot get list of centres",
        error: error.message,
      });
    }
  }
  
  