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
const genericResults = require("../middleware/genericResults");

router
  .route("/")
  .get(
    genericResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
