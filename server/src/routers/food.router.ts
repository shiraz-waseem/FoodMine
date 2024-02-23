import { sample_foods, sample_tags, sample_users } from "../data";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
import { UserModel } from "../models/user.model";

const router = Router();

router.get("/seed", async (req, res) => {
  const foodsCount = await FoodModel.countDocuments();
  if (foodsCount > 0) {
    res.send("Seed is already done!");
    return;
  }
  // Creating all sample foods inside the database
  await FoodModel.create(sample_foods);
  res.send("Seed Is Done!");
});

// all foods
// WITH ASYNC HANDLER
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

// by search term
router.get("/search/:searchTerm", async (req, res) => {
  // const searchTerm = req.params.searchTerm;
  // const foods = sample_foods.filter((food) =>
  //   food.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
});

// all tags
router.get("/tags", async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });

  const all = {
    name: "All",
    count: await FoodModel.countDocuments(),
  };

  tags.unshift(all);
  res.send(tags);
});

// by tag name
router.get("/tag/:tagName", async (req, res) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });
  res.send(foods);
});

// by foodid
router.get("/:foodId", async (req, res) => {
  // const foodId = req.params.foodId;
  // const food = sample_foods.find((food) => food.id == foodId);
  // res.send(food);

  const food = await FoodModel.findById(req.params.foodId);
  res.send(food);
});

export default router;
