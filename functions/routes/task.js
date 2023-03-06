const express = require("express");
const { createTask, getTasks,sortTasks, patchTask, deleteTask } = require("../controller/task");
const { requireSignin } = require("../middleware");
const {
  ValidateSaveTask, ValidateUpdateTask, ValidateDeleteTask,ValidateSortTask
} = require("../Global Functions/Task");

const router = express.Router();

router.post(
  "/createTask",
  requireSignin,
  ValidateSaveTask,
  createTask
);
router.get("/getTasks",requireSignin, getTasks);
router.put("/sortTasks", requireSignin,ValidateSortTask, sortTasks);
router.patch(
  "/patchTask",
  requireSignin,
  ValidateUpdateTask,
  patchTask
);
router.delete("/deleteTask", requireSignin, ValidateDeleteTask,deleteTask);

module.exports = router;
