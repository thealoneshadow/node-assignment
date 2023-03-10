

exports.isEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

exports.isISO8601 = (str) => {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,9})?(([+-]\d{2}:\d{2})|Z)?)?$/;
    return iso8601Regex.test(str);
}

exports.isMongoId = (str) => {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(str);
}

exports.isIn = (value, array) => {
    return array.includes(value);
}


exports.checkAlphanumeric = (str) => {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    return alphanumericRegex.test(str);

}