const { newResponseGenerator } = require("../../../utility/response");
const user = require("../../../models/user");
const networkList = require("../../../models/networkList");
const mongoose = require("mongoose");
exports.viewAllNetworksForUser = async (req, res) => {

  // Check if the user exists
  const userExist = await user
    .findOne({ _id: req.user._id })
    .lean(false)
    .exec();
  if (!userExist) {
    return newResponseGenerator(res, 400, false, "User Does Not Exist", []);
  }

  let data = userExist.networkList.map(item =>item._id);

  const networks = await networkList.find({
    _id: { $nin: data }
  }).exec();

  if (!networks) {
    return newResponseGenerator(res, 400, false, "Networks Not Found", []);
  }


  networks.forEach(network => {
    data.forEach(item => {
      if (item.toString() == network._id.toString()) {
        networks.splice(networks.indexOf(network), 1);
      }
    })
  })

  //const result = networks.find(network => !userExist.networkList.includes(network));


  return res.status(200).json({
    success: true,
    isAuth: true,
    message: networks.length == 0 ?"No Networks Available": `${networks.length} Networks Available`,
    networksCount: networks.length,
    result: networks,
  });
};

