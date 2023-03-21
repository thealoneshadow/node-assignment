const { newResponseGenerator } = require("../../../utility/response");
const networkList = require("../../../models/networkList");
const user = require("../../../models/user");
const { validation } = require("../../../utility/validation");

exports.deleteAllNetworksFromUser = async (req, res) => {
  // Validate the request body
  const validate = validation(["email"], ["email"], req.body, res);
  if (!validate.success)
    return newResponseGenerator(res, 400, false, validate.message, []);

  // Check if the user exists
  const userExist = await user
    .findOne({ email: req.body.email })
    .lean(false)
    .exec();
  if (!userExist) {
    return newResponseGenerator(res, 400, false, "User Does Not Exist", []);
  }

  // Delete the networks
  const deleteNetworkList = await user
    .updateOne({ email: req.body.email }, { $set: { networkList: [] } })
    .lean(false)
    .exec();

  if (!deleteNetworkList) {
    return newResponseGenerator(res, 400, false, "Networks Not Deleted", []);
  }

  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Networks Removed Successfully",
    result: [],
  });
};
