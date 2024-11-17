import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct, ProductsService} from "../../_services/products/products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductsService,
  ) {

  }

  ngOnInit(): void {
    this.subscription.add(
      this.productService.filteredProducts$.subscribe((pr) => {
        console.log("pr", pr);
          this.products = pr;
        }
      ))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setFilter(filter: string): void {
    this.productService.setFilter(filter);
  }

  addProduct(): void {
    const product: IProduct = {
      color: "red",
      id: Date.now(),
      name: "Product 1",
      price: 0,
      complete: false,
      createdAt: this.productService.formatDate(),
      updatedAt: this.productService.formatDate()
    }
    this.productService.addProduct(product)
  }

  changeComplete(id: number): void {
    this.productService.changeComplete(id)
  }

}
