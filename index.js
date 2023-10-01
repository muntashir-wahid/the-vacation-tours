require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

// Database connection
// Creating the connection string
const connectionString = process.env.DB_CONNECTION_STRING.replace(
  "PASSWORD",
  process.env.DB_PASSWORD
);
// Connecting to the Database
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected successfully"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
