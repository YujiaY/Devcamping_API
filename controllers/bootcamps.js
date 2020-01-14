// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "To show all bootcamps.",
    hello: req.hello
  });
}

// @desc     Get single bootcamps
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `To get bootcamp ${req.params.id}.`
  });
}

// @desc     Create single bootcamps
// @route    POST /api/v1/bootcamps
// @access   Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "To create new bootcamp."
  });
}

// @desc     Update single bootcamps
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `To update bootcamp ${req.params.id}.`
  });
}

// @desc     Delete single bootcamps
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `To delete bootcamp ${req.params.id}.`
  });
}
