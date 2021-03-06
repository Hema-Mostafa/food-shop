import { Component } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(prod => {
          this.product = prod;
        });
    }
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are You sure Delete this item ?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
