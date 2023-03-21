
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

  exports.checkDuplicateSort = (objectsArray) => {

    for (let i = 0; i < objectsArray.length; i++) {
      for (let j = i + 1; j < objectsArray.length; j++) {
        if (objectsArray[i]._id === objectsArray[j]._id && objectsArray[i].position === objectsArray[j].position && objectsArray[i].currentPosition === objectsArray[j].currentPosition) {
          return true;
        }
      }
    }
    return false;
  }