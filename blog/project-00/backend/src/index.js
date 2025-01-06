const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost"; // Add quotes around 'localhost'

app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
