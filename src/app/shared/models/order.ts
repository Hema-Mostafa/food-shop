import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];
    key: string;

    constructor(public userId: string, shoppingCart: ShoppingCart, public shipping: any) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    price: i.price,
                    imageUrl: i.imageUrl,
                },
                totalPrice: i.totlaPrice,
                quantity: i.quantity,
            }
        });
    }

}