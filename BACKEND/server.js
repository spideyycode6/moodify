// require dotenv for environment variables
const dotenv = require("dotenv");

// load environment variables
dotenv.config();

// require express app
const app = require("./app");

// require database connection function
const connectDB = require("./src/config/database");

// connect to database
connectDB();

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 