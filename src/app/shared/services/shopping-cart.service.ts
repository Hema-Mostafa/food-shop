import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> { // get the reference to The cart  // for make it easy to use , remove paramaters 
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(
        map(firebaseCart => new ShoppingCart(firebaseCart['items']))
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId, productKey) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey)
  }

  private async getOrCreateCartId(): Promise<string> {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, changes: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$.valueChanges().pipe(take(1))
      .subscribe((item) => {
        let quantity = ((item) ? item['quantity'] : 0) + changes;
        if (quantity === 0) items$.remove();
        else
          items$.update(
            {
              imageUrl: product.imageUrl,
              title: product.title,
              price: product.price,
              quantity: quantity
            });
      })
  }




}
