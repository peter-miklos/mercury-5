import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Product }           from '../_models/product.model';
import { ProductService }    from '../_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: Product[];
  private selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  private getAllProducts(): void {
    this.productService.getProducts()
        .subscribe(
          result => {this.products = result},
          err => console.log(err)
        )
  }

}
