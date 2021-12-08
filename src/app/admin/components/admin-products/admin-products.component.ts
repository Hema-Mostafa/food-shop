import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: Product[];
  subscribtion: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(productService: ProductService) {
    this.subscribtion = productService.getAll()
      .subscribe((prod) => {
        this.products = prod
        this.initializeTable(prod);
      })
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  private initializeTable(product: Product[]) {
    this.tableResource = new DataTableResource(product);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }
  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);

  }
  filter(query: string) {

    let filterdProducts = (query) ?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filterdProducts);
  }

}
