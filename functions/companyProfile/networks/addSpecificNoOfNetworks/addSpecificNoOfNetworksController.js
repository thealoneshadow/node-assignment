const { newResponseGenerator } = require("../../../utility/response");
const networkList = require("../../../models/networkList");
const user = require("../../../models/user");
const { validation } = require("../../../utility/validation");

exports.addSpecificNoOfNetworks = async (req, res) => {
  let networksToAdd = req.url.slice(38);
  if(networksToAdd < 0){
    networksToAdd = 50;
  }

  // Validate the card category Id
  const validate = validation(["email"], ["email"], req.body, res);
  if (!validate.success)
    return newResponseGenerator(res, 400, false, validate.message, []);
  const networksUserHas = await user
    .findOne({ email: req.body.email })
    .lean(false)
    .exec();
  if (!networksUserHas) {
    return newResponseGenerator(res, 400, false, "User Does Not Exist", []);
  }
 
  const totatNetworks = await networkList.find({}).lean(false).exec();

  const differentNetworks =await totatNetworks.filter(item2 => {
    const index = networksUserHas.networkList.findIndex(item1 => item1._id.equals(item2._id));
    return index === -1;
  });

  let result= [];
  for(let i = 0; i < networksToAdd; i++){
    if(differentNetworks[i] === undefined) break;
    differentNetworks[i].networkId = differentNetworks[i]._id.toString();
    result.push({
      _id: differentNetworks[i]._id,
      networkId: differentNetworks[i]._id.toString(),
      networkName: differentNetworks[i].networkName,
      networkLogoURL: differentNetworks[i].networkLogoURL,
    })
  }

  // Check if the result is empty
  if (result.length === 0) {
    return newResponseGenerator(
      res,
      400,
      false,
      "No Networks Found To Add",
      []
    );
  }

  const updateNetworkList = await user
    .updateOne({ email: req.body.email }, { $push: { networkList: result } })
    .lean(false)
    .exec();

  if (!updateNetworkList) {
    return newResponseGenerator(res, 400, false, "Networks Not Updated", []);
  }

  const updatedResult = result.map(
    ({ _id, networkName, networkLogoURL, networkVerifiedStatus }) => ({
      networkId: _id.toString(),
      networkName,
      networkLogoURL,
      networkVerifiedStatus,
    })
  );

  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Networks Updated Successfully",
    networksCount: result.length,
    result: updatedResult,
  });
};
