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
  validateCreateTaskRequest,
  isRequestValidated,
  createTask
);
router.get("/getTasks", requireSignin, getTasks);
router.put("/sortTasks", requireSignin, sortTasks);
router.patch(
  "/patchTask",
  requireSignin,
  validatePatchTaskRequest,
  isRequestValidated,
  patchTask
);
router.delete("/deleteTask", requireSignin,validateDeleteTaskRequest,isRequestValidated, deleteTask);

module.exports = router;
