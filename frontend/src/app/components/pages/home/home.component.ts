import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchComponent,
    TagsComponent,
    NotFoundComponent,
    StarRatingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];

  // foodservice with type of FoodService because of that Angular will look at the type we used inside the constructor and give this parameter a new instance of FoodService we dont need to institate it
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      } else if (params['tag'])
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      else {
        foodsObservable = foodService.getAll(); // if there is no search
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });

    // this.foods = foodService.getAll();
  }

  // Rxjs
}
