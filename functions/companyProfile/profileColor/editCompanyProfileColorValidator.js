exports.checkValidParameters = (checkBody) => {
  let valuestocheck = [];
  let type = [];
  if (checkBody.primaryColor!=undefined) {
    valuestocheck.push("primaryColor");
    type.push("colorCode");
  }
  if (checkBody.secondaryColor!=undefined) {
    valuestocheck.push("secondaryColor");
    type.push("colorCode");
  }
  if (checkBody.textColor!=undefined) {
    valuestocheck.push("textColor");
    type.push("colorCode");
  }
  return { valuestocheck: valuestocheck, type: type };
};
