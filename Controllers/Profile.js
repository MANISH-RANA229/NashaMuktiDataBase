const User = require("../Models/Person");

const { options } = require("../Routes/Routes");

//add profile
exports.addProfile = async (req, res) => {
  try {
    const { name,email,city, state,age,addictionPeriod,mobileNumber} = req.body;
    

    const existingProfile = await User.findOne({
      email
    });
    console.log(existingProfile);

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile with the same details already exists.",
      });
    }

    const profile = await User.create({
        name,email,city, state,age,addictionPeriod,mobileNumber
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

//get profile of all users
exports.profileList = async (req, res) => {
  try {
    const profiles = await User.find().sort({ addictionPeriod: -1 });

    return res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get profiles",
      error: error.message,
    });
  }
}


