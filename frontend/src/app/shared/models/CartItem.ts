import { Food } from './Food';

export class CartItem {
  // constructor defined thats get the food as input and set this.food = Food and consturctor ke bahir food!:Food

  //   constructor(food:Food){
  //     this.food=food;
  //   }
  //   food!:Food;

  // use access modifier and access it from outside and its required too
  constructor(public food: Food) {}

  // default values aik ki 1 and aik ki this.food.price
  quantity: number = 1;
  price: number = this.food.price;
}
