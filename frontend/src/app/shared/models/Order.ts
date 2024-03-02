import { CartItem } from './CartItem';

export class Order {
  id!: number;
  items!: CartItem[]; // order.items = cart.items (We dont need to create items again)
  totalPrice!: number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
