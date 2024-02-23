const jwt = require("jsonwebtoken");
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";

const router = Router();

// for users
router.get("/seed", async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  // Creating all sample foods inside the database
  await UserModel.create(sample_users);
  res.send("Seed Is Done!");
});

// login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // phely wal is of sample_user and 2nd is we getting from req.body
  const user = await UserModel.findOne({ email, password });

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
const generateTokenReponse = (user: User) => {
  // process of generating token -> sign . Right now we want to encode email and isAdmin properties. 2nd paramater is private key env mein baad mein rkh dena. Everyone has this secret can decode
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d", // will be expired in 30 days
    }
  );

  // user.token = token;
  // return user;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default router;
