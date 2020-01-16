const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const geocoder = require('../utils/geocoder');

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  };
  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

// @desc     Create single bootcamps
// @route    POST /api/v1/bootcamps
// @access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp =await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp._id
  });
});

// @desc     Update single bootcamps
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  };
  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

// @desc     Delete single bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  };
  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

// @desc     Get bootcamps within a radius(in kilometers)
// @route    GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access   Public
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat&lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Cal radius using radius
  // Divide dist by radius of Earth
  // Earth Radius = 6,378 kilometers or 3,963.2 miles

  const EARTH_RADIUS = 3963.2; // in miles
  const KILOMETERS_PER_MILE = 1.609;
  const distanceInMiles = distance / KILOMETERS_PER_MILE;
  const radius = distanceInMiles / EARTH_RADIUS;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })
  
});
