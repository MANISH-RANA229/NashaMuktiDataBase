const User = require("../Models/Person");

const { options } = require("../Routes/Routes");

//add profile
exports.addProfile = async (req, res) => {
  try {
    const {RegistrationNo,Name,mobileNumber,email,State,City,DeAddictionCenter,DateOfRegistration,TypeOfDrug,addictionPeriod,Medication,RecovringStatus,ProvidedBeneficiary} = req.body;
    

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

    const profile = await User.create({RegistrationNo,Name,mobileNumber,email,State,City,DeAddictionCenter,DateOfRegistration,TypeOfDrug,addictionPeriod,Medication,RecovringStatus,ProvidedBeneficiary});
    

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
    const profiles = await User.find().sort({ addictionPeriod: -1 }).select('-_id');;

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


