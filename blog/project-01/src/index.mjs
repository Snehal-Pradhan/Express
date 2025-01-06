import express from "express";
import users from "../MOCK_DATA .json" assert { type: "json" };
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});

//GET /users - List all users
app.get("/", (req, res) => {
  res.send("Home route");
});
/* app.get("/users", (req, res) => {
  return res.json(users);
}); */

//GET /users/1 - get the user with id 1
