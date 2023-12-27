const User=require('../Models/Person');
const{options}=require('../Routes/Routes');


exports.countMembers = async (req, res) => {
    try {
      // Aggregate pipeline to group and count members by city
      const cityCounts = await User.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 } } },
      ]);

      const totalUsers = await User.countDocuments();
  
    
      return res.status(200).json({
        success: true,
        message: "Member count by city || Total Users",
        cityCounts,
        totalUsers
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Cannot get member count by city",
        error: error.message,
      });
    }
  };
  


 