import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // field that holds the cart
  // private cart: Cart = new Cart();

  // After setting localStorage
  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food): void {
    // we searched through the items of cart and find the food inside it when ids are equal and we will add them into cart
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return; // if already added then return. It shouldnt continue the process
    // otherwise push krwa degy
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    // we are removing the above id from list of items
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    // CartItem find by foodId
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  // returns Observable of type Cart
  // Having an observable from cart and converting into observable by using asObservable
  // We sent this as observable because if we send the cartSubject outside we could be able to change the value outside the cart service and we dont want. We want cart service changes done in the cart service
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    // setting values of cart. First part of reduce is accum which has prevSum and currentItem
    // jitni items in cart utni baar reduce will be call phely prevSum will be 0 and second time run huga value change hujaye gy and it will be prevSum
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    // String represention of cart type json
    const cartJson = JSON.stringify(this.cart);
    // local storage mein set with key as Cart
    localStorage.setItem('Cart', cartJson);

    // When we set something to localstorage this mean we are changing the cart so anybody listening to the cart observables need to be notified
    this.cartSubject.next(this.cart); // this.cart we changed it
  }

  private getCartFromLocalStorage(): Cart {
    // key must be the same
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
