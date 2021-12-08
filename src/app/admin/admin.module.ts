import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGard } from 'shared/services/auth-gard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminGard } from './services/admin-gard.service';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([

      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGard, AdminGard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGard, AdminGard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGard, AdminGard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGard, AdminGard]
      },
    ])
  ]
})
export class AdminModule { }
