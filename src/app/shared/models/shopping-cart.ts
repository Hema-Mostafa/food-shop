import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productKey: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (let productKey in this.itemsMap) {
            let item = itemsMap[productKey];
            this.items.push(new ShoppingCartItem({ ...item, key: productKey }));
        }
    }


    get totalPrice() {
        let sum = 0;
        for (let productKey in this.items) {
            sum += this.items[productKey].totlaPrice;

        }
        return sum;
    }

    get shoppingCartItemCount() {
        let count = 0;
        for (let productKey in this.itemsMap)
            count += this.itemsMap[productKey].quantity;

        return count;
    }
    public getQuantity(product: Product): number {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
}