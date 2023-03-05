const express = require("express");
const { createTask, getTasks,sortTasks, patchTask, deleteTask } = require("../controller/task");
const { requireSignin } = require("../middleware");
const {
  validateCreateTaskRequest,
  validatePatchTaskRequest,
  isRequestValidated,
  validateDeleteTaskRequest
} = require("../validators/task");

const router = express.Router();

router.post(
  "/createTask",
  requireSignin,
  createTask
);
router.get("/getTasks",requireSignin, getTasks);
router.put("/sortTasks", requireSignin, sortTasks);
router.patch(
  "/patchTask",
  requireSignin,
  patchTask
);
router.delete("/deleteTask", requireSignin,deleteTask);

module.exports = router;
