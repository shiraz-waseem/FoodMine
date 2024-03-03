import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    OrderItemsListComponent,
    MapComponent,
  ],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder, // for building the form
    private userService: UserService, // to have default name and address
    private toastrService: ToastrService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  // We have the cart items and price now lets create the form
  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  // to have easy access to checkout form controls
  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    // if its return out means form is fine
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    console.log(this.order);
  }
}
