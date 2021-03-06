const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

const Course = require("../models/Course");

const { protect, authorize } = require("../middleware/auth");
const genericResults = require("../middleware/genericResults");

router
  .route("/")
  .get(
    genericResults(Course, [
      {
        path: "bootcamp",
        select: "name description"
      },
      {
        path: "user",
        select: "name role"
      }
    ]),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
