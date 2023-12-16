const List = require("../Models/CenterList");
const { options } = require("../Routes/Routes");







// exports.centreList = async (req, res) => {
//   try {
//     const { city } = req.params;
//     console.log(city);
//     const centreList = await List.find({ "address.city": city });
//     console.log(centreList);
//     return res.status(200).json({
//       success: true,
//       message: "List of Centres",
//       centreList,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Cannot get list of centres",
//       error: error.message,
//     });
//   }
// }
