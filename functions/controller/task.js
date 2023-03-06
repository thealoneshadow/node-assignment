const { responseGenerator } = require("../Global Functions/response");
const task = require("../models/task");
const Task = require("../models/task");
const validator = require("validator");

exports.createTask = async (req, res,next) => {
  try {
    // Destructuring the request body
    const { title, date, status } = req.body;


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
  console.log(req.user);
  const result = await Task.find({userId:req.user._id}).lean(false).exec();
  return res.status(200).json({success:true, result:[result] });
};

exports.sortTasks = (req, res) => {
  try {
 
    Task.find({ userId: req.user._id}).exec(
      (err, task) => {
        if (err) return responseGenerator(res, 400, false, err.message, []);
        console.log(task);
        if (task) {
          for(let i=0 ; i<req.body.length ; i++){
            let key = req.body[i];
            console.log(key);
          const result = task.find((elem) => key._id == elem._id);
          console.log(result);
          if(!result){
            return responseGenerator(res, 400, false, "Wrong Task Id Provided to sort", []);
          } else{
            // sstart

            Task.updateOne({ _id: key._id },{$set: {position: key.position}}).exec((err, tasks) => {
              if (err) return responseGenerator(res, 400, false, err.message, []);
              if (tasks) {
                Task.updateOne({ _id: tasks.id },{ $set: { position: key.currentPosition }}).exec((err, tasksUpdated) => {
                  if (err) return responseGenerator(res, 400, false, err.message, []);
                  if (tasksUpdated) return responseGenerator(res, 200, true, "Tasks Sorted Successfully", []);
                });
              }
            });

            //end
          }
        }
        } else {
          return responseGenerator(res, 400, false, "No Tasks Found For Sorting", []);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.patchTask = (req, res,next) => {
  try {
    Task.updateOne(
      { _id: req.body._id },
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
  try {
    Task.deleteOne({ _id: req.body._id }).exec((err, task) => {
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
