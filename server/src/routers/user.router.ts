const jwt = require("jsonwebtoken");
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
const bcrypt = require("bcryptjs");
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

  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenReponse(user));
  } else {
    // const BAD_REQUEST = 400;
    res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
  }
});

// Register API
router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenReponse(dbUser));
});

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d", // will be expired in 30 days
    }
  );

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
