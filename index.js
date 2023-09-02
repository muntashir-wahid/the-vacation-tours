const app = require("./app");

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
