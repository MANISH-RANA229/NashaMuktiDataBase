// profileController.js
const User = require("../Models/Person");
const { options } = require("../Models/Person");

exports.getUpdateProfilePage = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId,{$set:{ status: "Recovered"}});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Render your update profile page, or return data as needed
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get update profile page",
      error: error.message,
    });
  }
}
   

    

    





  

