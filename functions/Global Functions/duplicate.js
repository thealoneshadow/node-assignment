
exports.hasDuplicateFields = (req) => {
    const fields = {};
  const duplicates = {};
  for (let key in req.body) {
    if (fields.hasOwnProperty(key)) {
      if (duplicates.hasOwnProperty(key)) {
        duplicates[key].push(req.body[key]);
      } else {
        duplicates[key] = [fields[key], req.body[key]];
      }
    } else {
      fields[key] = req.body[key];
    }
  }
  if (Object.keys(duplicates).length > 0) {
    return true;
  } else {
    return false;
  }
  };