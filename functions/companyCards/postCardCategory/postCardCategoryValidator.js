const { validation } = require("../../utility/Validation");

exports.validatePostArray = (body) => {
  if (Object.keys(body).length === 0)
    return { success: false, message: "Request Body is Empty" };

  const allowedFields = ["cardCategories"];
  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return {
      success: false,
      message: `Invalid field(s): ${extraFields.join(
        ", "
      )} Expected format:{"cardCategories":[{}]}`,
    };
  }
  return { success: true, message: "Valid" };
};
