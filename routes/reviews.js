const express = require("express");
const router = express.Router({ mergeParams: true });

const { getReviews, getReview, addReview } = require("../controllers/reviews");

const Review = require("../models/Review");

const { protect, authorize } = require("../middleware/auth");
const genericResults = require("../middleware/genericResults");

router
  .route("/")
  .get(
    genericResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router.route("/:id").get(getReview);

module.exports = router;
