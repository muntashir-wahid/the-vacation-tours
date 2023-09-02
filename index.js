require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
