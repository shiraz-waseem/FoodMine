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
  // const order = await OrderModel.findOne({
  //   user: req.user.id,
  //   status: OrderStatus.NEW,
  // });
  const order = await getNewOrderForCurrentUser(req);
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
});

router.post("/pay", async (req: any, res) => {
  // get payment id from request of the body. aisa destructure krne sy you dont have to write req.body.paymentId
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);

  if (!order) {
    res.status(HTTP_BAD_REQUEST).send("Order Not Found!");
    return;
  }

  // dosri paymentId coming from req.body
  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
});

export default router;

async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
}
