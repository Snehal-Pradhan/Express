import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// what is a route?
// why showed /cannot get
// requests are made on those routes.
// also there are a no. of requests like get,post, delete, update -> methods

// app.{method}("{route}",{requestHandler})
// request handler is just a callback funtion with two arguments one request and another one is response. -> both of them are objects
// requstHandler = (req,res)=>{
//    res.send("hello")
//    }

const mockUser = [
  { id: 1, username: "Deanne Livingstone", lastName: "Deanne" },
  { id: 2, username: "Erena Steckings", lastName: "Erena" },
  { id: 3, username: "Brunhilde Scothorne", lastName: "Brunhilde" },
  { id: 4, username: "Sibella Catterick", lastName: "Sibella" },
  { id: 5, username: "Adora Grabeham", lastName: "Adora" },
];

app.get("/", (req, res) => {
  res.status(201).send("hello world");
});

app.get("/api/users", (req, res) => {
  res.send(mockUser);
});

app.listen(PORT, () => {
  console.log(`server runnig on Port ${PORT}`);
});

// route parameters
// what if i need a specific data which satisfies that parameter.
app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId))
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  const findUser = mockUser.find((user) => user.id === parsedId);
  if (!findUser) {
    return res.sendStatus(404);
  }
  res.send(findUser);
});
