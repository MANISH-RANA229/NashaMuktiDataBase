const Expert = require("../Models/Expert");
const { options } = require("../Routes/Routes");

//add expert
exports.addExpert = async (req, res) => {
    try {
      const {Name,city,state,Qualifications,Description,Rating,Reviews,contact} = req.body;
      console.log(req.body);

    
  
      const existingExpert = await Expert.findOne({
        Name,
        city,
        state
      });
      console.log(existingExpert);
  
      if (existingExpert) {
        return res.status(400).json({
          success: false,
          message: "Expert with the same details already exists.",
        });
      }
     
  
  
      const expert = await Expert.create({
        Name,city,state, Qualifications,Description,Rating,Reviews,contact
      });
      console.log("here");

      console.log(expert);
      return res.status(200).json({
        success: true,
        message: "Expert Added Successfully",
        expert,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot add expert",
        error: error.message,
      });
    }
  }

  //export all experts
  exports.expertList = async (req, res) => {
    try {
      const expertList = await Expert.find().sort({ Rating: -1 });
      // Sorting by rating in descending order (higher ratings first)
  
      return res.status(200).json({
        success: true,
        message: "List of Experts",
        expertList,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot get list of experts",
        error: error.message,
      });
    }
  };
  