import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'order-items-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css',
})
export class OrderItemsListComponent {
  @Input()
  order!: Order;
}
