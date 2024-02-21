import { CartItem } from './CartItem';

export class Cart {
  // with default value as empty array instead of undefined  // new Cart() {}
  items: CartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}
