const mongoose = require('mongoose');

// Connect to DB
exports.connectDB  = () => {
  return mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};
