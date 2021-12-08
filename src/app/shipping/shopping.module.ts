import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGard } from 'shared/services/auth-gard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingOrderSummaryComponent } from './components/shopping-order-summary/shopping-order-summary.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingOrderSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGard] },
    ])

  ],
  exports: [
    ProductsComponent,
    ProductFilterComponent,
  ]
})
export class ShippingModule { }
