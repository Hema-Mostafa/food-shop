import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-order-summary',
  templateUrl: './shopping-order-summary.component.html',
  styleUrls: ['./shopping-order-summary.component.css']
})
export class ShoppingOrderSummaryComponent {
  @Input('cart') cart: ShoppingCart[];

}
