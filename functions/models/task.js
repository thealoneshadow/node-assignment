const mongoose = require("mongoose");
const validator = require("validator");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Incomplete"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);


//save hook
taskSchema.pre("save", function (next, req) {
  const date = this.date;

  const allowedFields = ["title", "date", "status"];
  const extraFields = Object.keys(req.req).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
  }

  // Validating the request for date
  if (
    typeof date !== "string" ||
    validator.isEmpty(date) ||
    !validator.isISO8601(date)
  ) {
    return next(
      new Error(
        "Date is required and must be a valid date string in ISO 8601 format"
      )
    );
  }
  next();
});


//update hook
taskSchema.pre("updateOne", function (next) {
  const updates = this.getUpdate();

  // Validating the request for allowed fields
  const allowedFields = ["_id", "title", "date", "status"];
  const extraFields = Object.keys(updates.req).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
  }

  next();
});

// updateMany hook
taskSchema.pre("updateMany", function (next) {
  const updates = this.getUpdate();
console.log(updates);
  // Validating the request for empty body
  if (Object.keys(updates.req).length === 0) {
    return next(new Error("Request Body is Empty"));
  }

  // Validating the request for missing fields
  if (
    updates.req._id == undefined ||
    updates.req.position == undefined ||
    updates.req.currentPosition == undefined
  ) {
    return next(new Error("Fields Missing Expected:{_id,position,currentPosition}"));
  }

  // Validating the request for allowed fields
  const allowedFields = ["_id", "position", "currentPosition"];
  const extraFields = Object.keys(updates.req).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
  }

  next();
});


//delete hook
taskSchema.pre("deleteOne", function (next) {
  const data= this.getQuery();

    // Validating the request for empty body
    if (Object.keys(data).length === 0) {
      return next(new Error("Request Body is Empty"));
    } 
    // Validating the request for missing fields
    if (
     data._id == undefined 
    ) {
      return next(new Error("_id field is missing"));
    }

    // Validating the request for allowed fields
    const allowedFields = ["_id",'iat','exp'];
  const extraFields = Object.keys(data).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
  }
  next();
});


// taskSchema.post("save", true, function(doc,next) {
//   next();
// });

taskSchema.virtual("slug").get(function () {
  return `${this.title} ${this.status}`;
});

module.exports = mongoose.model("Task", taskSchema);
