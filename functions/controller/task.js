const { validation } = require("../utility/Validation");
const { checkDuplicateSort } = require("../utility/duplicate");
const { responseGenerator } = require("../utility/response");
const Task = require("../models/task");

exports.createTask = async (req, res,next) => {
  try {
    // Destructuring the request body
    const { title, date, status } = req.body;
    const validate =await validation(["title","date","status"],["string","date","status"],req.body,res);
    if(!validate.success){
      return responseGenerator(res, 400, false, validate.message, []);
    }

    // Finding based on the user id and then sorting the tasks based on the position
    Task.find({ userId: req.user._id }).exec(async (err, tasks) => {
      const position = tasks === undefined ? 1 : tasks.length + 1;
      const userId = await req.user._id;
      const task = new Task({ title, date, status, userId, position });
      task.save({req: req.body},async (err, task) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        if (task) {
          return res.status(201).json({success:true,message:"Succesfully Created New Task", result:[task] });
        }
      });
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({success:false, message:errors });
    }
  }
};

exports.getTasks = async (req, res) => {
  const result = await Task.find({userId:req.user._id}).lean(false).exec();
  return res.status(200).json({success:true, result:[result] });
};

// exports.sortTasks =async (req, res) => {
//   try {
    
//     // Checking if the request body has duplicate fields
//     const check = await checkDuplicateSort(req.body);
//     if(check){
//       return responseGenerator(res, 400, false, "Duplicate Fields Found", []);
//     }
//     for(let i=0 ; i<req.body.length ; i++){
//     let key = req.body[i];
//     Task.find({ userId: req.user._id}).exec( async (err, task) => {
//         if (err) return responseGenerator(res, 400, false, err.message, []);
//         console.log("i am task" +task);
//         if (task) {
//           const result = task.find((elem) => key._id == elem._id);
//           console.log("i am result" +result);
//           if(!result){
//             return responseGenerator(res, 400, false, "Wrong Task Id Provided to sort", []);
//           } else{
//             // sstart
//             const response =  await Task.findOne({userId: req.user._id,position: key.position}).exec();
//             const update   =await Task.updateOne({ _id: key._id },{$set: {position: key.position}}).exec(async(err, tasks) => {
//               if (err) return responseGenerator(res, 400, false, err.message, []);
//               console.log(tasks);
//               if (tasks) {
//                 Task.updateOne({ _id: response._id },{ $set: { position: result.position }}).exec(async (err, tasksUpdated) => {
//                   if (err) return responseGenerator(res, 400, false, err.message, []);
//                   if (tasksUpdated) {
//                     return true;
//                   }
//                 });
//               }
//             });



//             //end
//           }
//         } else {
//           return responseGenerator(res, 400, false, "No Tasks Found For Sorting", []);
//         }
//       } 
//     );
//     } 
//     return responseGenerator(res, 200, true, "Tasks Sorted Successfully", []);
//   } catch (err) {
//     console.log(err);
//   }
// };


exports.sortTasks =async (req, res) => {
    
    // Checking if the request body has duplicate fields
    let data = req.body.tasks;

    for(let i=0 ; i<data.length ; i++){
      const validate =await validation(["taskId","position"],["id","number"],data[i],res);
      if(!validate.success){
        return responseGenerator(res, 400, false, validate.message, []);
      }
    }
    const check = await checkDuplicateSort(data);
    if(check){
      return responseGenerator(res, 400, false, "Duplicate Fields Found", []);
    }
    for(let i=0 ; i<data.length ; i++){
    let key = data[i];

    const task = await Task.findOne({ userId: req.user._id, _id: key.taskId }).exec();

    if (!task) {
      return responseGenerator(res, 400, false, "Wrong Task Id Provided to sort", []);
    }

    const response = await Task.findOne({ userId: req.user._id, position: key.position }).exec();

    const tasksUpdated = await Task.updateOne({ _id: key.taskId }, { $set: { position: key.position } }).exec();

    if (tasksUpdated.nModified === 0) {
      return responseGenerator(res, 400, false, "Task position not updated", []);
    }

    if (response) {
      const updateResponse = await Task.updateOne({ _id: response._id }, { $set: { position: task.position } }).exec();

      if (updateResponse.nModified === 0) {
        return responseGenerator(res, 400, false, "Task position not updated", []);
      }
    }
    } 
    return responseGenerator(res, 200, true, "Tasks Sorted Successfully", []);
};

exports.patchTask = (req, res,next) => {
  try {
    const validate = validation(["taskId","title","date","status"],["id","string","date","status"],req.body,res);
    if(!validate.success){
      return responseGenerator(res, 400, false, validate.message, []);
    }
    Task.updateOne(
      { _id: req.body.taskId },
      {req: req.body},
      {
        $set: {
          title: req.body.title,
          date: req.body.date,
          status: req.body.status,
        },
      }
    ).exec(async (err, task) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      if (task) {
        return res.status(201).json({success:true,message:"Succesfully Updated the Task Details",  result:[task] });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = (req, res) => {
  const validate = validation(["taskId"],["id"],req.body,res);
    if(!validate.success){
      return responseGenerator(res, 400, false, validate.message, []);
    }
  try {
    Task.deleteOne({ _id: req.body.taskId }).exec((err, task) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      if (task) {
        return res.status(202).json({success:true,message: "Deleted the given task", result:[task] });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
