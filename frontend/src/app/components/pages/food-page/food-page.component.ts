import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NotFoundComponent, StarRatingComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  // setting its type as Food
  food!: Food;

  // now we need to inject activatedRoute to read foodId from params and injected Foodservice to get the food based on that food id
  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    // if the params id then do this
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        // params.id
        foodService.getFoodById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
        });
    });
  }

  // for cart service
  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
