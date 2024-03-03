import { Router } from "express";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post("/create", async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send("Cart Is Empty!");
    return;
  }

  // for new order. Whenever there is order previous order delete krdo. Where there is idea came from? we dont have we will use auth middleware to get
  await OrderModel.deleteOne({
    user: req.user.id, // upper any type de dena
    status: OrderStatus.NEW,
  });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  await newOrder.save();
  res.send(newOrder);
});

router.get("/newOrderForCurrentUser", async (req: any, res) => {
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
});
export default router;
