import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from '../../../src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  // in future it will be connected to backend
  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  // should return Food array as result
  getAllFoodsByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }

  // parameter with string type
  getFoodById(foodId: string) {
    // if not found or undefined then after ?? wala
    return this.getAll().find((food) => food.id == foodId) ?? new Food();
  }
}
