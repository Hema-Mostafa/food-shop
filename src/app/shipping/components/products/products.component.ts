import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { switchMap } from 'rxjs/operators'
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {


  products: Product[] = [];
  filterProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {

  }
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {

    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.aplyFilter();
      })
  }

  private aplyFilter() {
    this.filterProducts = (this.category) ?
      this.products.filter(p => p.category == this.category) :
      this.products;
  }


}
