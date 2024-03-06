import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input()
  stars!: number; // required for getting the stars of food

  @Input()
  size: number = 1; // size of star not mandatory but we want to set it value

  get styles() {
    return {
      'width.rem': this.size, // will be 1
      'height.rem': this.size, // will be 1 as it need to be square
      'marginRight.rem': this.size / 6, // need space
    };
  }

  // takes number and returns string and responsible for giving the image based on current stars
  getStarImage(current: number): string {
    // loop one by one
    const previousHalf = current - 0.5;
    const imageName =
      this.stars >= current
        ? 'star-full'
        : this.stars >= previousHalf
        ? 'star-half'
        : 'star-empty';
    return `/assets/stars/${imageName}.svg`;
  }
}
