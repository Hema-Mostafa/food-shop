import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { map } from 'rxjs/operators'
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders/').push(order);
    this.shoppingCartService.clearCart();

    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db.list('/orders').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Order;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      )
  }


  getOrderByUser(uId: string): Observable<Order[]> {
    return this.db.list('/orders/', ref => {
      return ref.orderByChild('userId').equalTo(uId);
    }).snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Order;
            const key = c.payload.key;
            return { key, ...data };
          })
        )
      )
  }
}
