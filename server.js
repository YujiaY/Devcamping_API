const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const colors = require("colors");

const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Routes files
const auth = require("./routes/auth");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

connectDB()
  .then(res => {
    console.log(`DB Connected to ${res.connections[0].host}`.yellow.bgGreen);
    const server = app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.green
      )
    );
    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err.message}`.red);
      // Close server and exit process
      server.close(() => process.exit(1));
    });
  })
  .catch(e => {
    console.log("DB Connection Failed!".red);
    console.error(e.message);
    process.exit(1);
  });
