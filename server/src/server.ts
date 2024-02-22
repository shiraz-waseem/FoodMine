import express from "express";
import cors from "cors";

import { sample_foods, sample_tags, sample_users } from "./data";

const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// all foods
app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

// by search term
app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

// all tags
app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

// by tag name
app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

// by foodid
app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find((food) => food.id == foodId);
  res.send(food);
});

// login API
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // phely wal is of sample_user and 2nd is we getting from req.body
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  // const body = req.body;
  // const user1 = sample_users.find(
  //   (user) => user.email === body.email && user.password === body.password
  // );

  if (user) {
    res.send(generateTokenReponse(user));
  } else {
    const BAD_REQUEST = 400;
    res.status(BAD_REQUEST).send("Username or password is invalid!");
  }
});

// get user with type of any
const generateTokenReponse = (user: any) => {
  // process of generating token -> sign . Right now we want to encode email and isAdmin properties. 2nd paramater is private key env mein baad mein rkh dena. Everyone has this secret can decode
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d", // will be expired in 30 days
    }
  );

  user.token = token;
  return user;
};

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
