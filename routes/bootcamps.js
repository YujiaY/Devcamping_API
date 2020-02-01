const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const genericResults = require("../middleware/genericResults");

// Include other resource routers
const courseRouter = require("./courses");

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

router
  .route("/")
  .get(
    genericResults(Bootcamp, {
      path: "courses",
      select: "title description -bootcamp"
    }),
    getBootcamps
  )
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
