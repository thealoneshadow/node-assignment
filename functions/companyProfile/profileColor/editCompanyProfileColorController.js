const { newResponseGenerator } = require("../../utility/response");
const user = require("../../models/user");
const { validation } = require("../../utility/validation");
const { checkValidParameters } = require("./editCompanyProfileColorValidator.js");

exports.editUserColors = async (req, res) => {
  // Validate the request body
  const checkBody = await checkValidParameters(req.body);
  if (req.body == {})
    return newResponseGenerator(res, 400, false, "Request Body is Empty", []);
  if (checkBody.valuestocheck.length == 0)
    return newResponseGenerator(res, 400, false, "Invalid Inputs Passed", []);
  const validate = validation(
    checkBody.valuestocheck,
    checkBody.type,
    req.body,
    res
  );
  if (!validate.success)
    return newResponseGenerator(res, 400, false, validate.message, []);
  // Check if the user exists
  const userExist = await user
    .findOne({ _id: req.user._id })
    .lean(false)
    .exec();
  if (!userExist) {
    return newResponseGenerator(res, 400, false, "User Does Not Exist", []);
  }

  const updateColors = await user
    .updateOne(
      { _id: req.user._id },
      {
        $set: {
          primaryColor:
            req.body.primaryColor === undefined
              ? userExist.primaryColor
              : req.body.primaryColor.toUpperCase(),
          secondaryColor:
            req.body.secondaryColor === undefined
              ? userExist.secondaryColor
              : req.body.secondaryColor.toUpperCase(),
          textColor:
            req.body.textColor === undefined
              ? userExist.textColor
              : req.body.textColor.toUpperCase(),
        },
      }
    )
    .exec();

  if (!updateColors)
    return newResponseGenerator(res, 400, false, "Failed to Update Colors", []);

  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Successfully Updated Colors",
    result: [],
  });
};
