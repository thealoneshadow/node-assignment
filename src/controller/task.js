const task = require("../models/task");
const Task = require("../models/task");

exports.createTask = (req, res) => {
  try {
    const { title, date, status } = req.body;
   Task.find({userId: req.user._id}).exec((err, tasks) => {
      const position = tasks === undefined ? 1 : tasks.length + 1;
      const userId = req.user._id;
      const task = new Task({ title, date, status,userId,position });
      task.save((err, task) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        if (task) {
          return res.status(201).json({ task });
        }
      });
    });
  }
    catch (err) {
      console.log(err);
    }
};

exports.getTasks = (req, res) => {
  Task.find({userId: req.user._id}).sort({position: req.body.position}).exec((err, tasks) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    if (tasks) {
      return res.status(200).json({ tasks });
    }
  });
};


exports.sortTasks = (req, res) => {
  try {
    Task.findOne({userId: req.user._id,position: req.body.position}).exec((err, task) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      if (task) {
        Task.updateOne({_id: req.body._id},{
          $set: {
              position: req.body.position
          }
        }).exec((err, tasks) => { });
        Task.updateOne({_id: task._id},{
          $set: {
              position: req.body.currentPosition
          }
        }).exec((err, tasks) => {})
      }
    });
    res.status(200).json({ message: "success" });
  }
  catch (err) {
    console.log(err);
  }
}

exports.patchTask = (req, res) => {
  try {
    Task.updateOne({ _id: req.body._id },{
        $set: {
            title: req.body.title,
            date: req.body.date,
            status: req.body.status
        }
    }).exec(async (err, task) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      if (task) {
            return res.status(201).json({ task });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = (req, res) => {
    try{
        Task.deleteOne({ _id: req.body._id }).exec( (err, task) => {
            if (err) {
                return res.status(400).json({
                    error: "Something went wrong",
                });
            }
            if (task) {
                return res.status(201).json({ task });
            }
        })
    }
    catch(err){
        console.log(err);
    }
}