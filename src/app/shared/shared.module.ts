import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular7-data-table';
import { AppRoutingModule } from 'app/app-routing.module';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],

  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule.forRoot(),
  ],
  exports: [

    CommonModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule.forRoot().ngModule,
    // Components 
    ProductCardComponent,
    ProductQuantityComponent,

  ],
})
export class SharedModule { }
