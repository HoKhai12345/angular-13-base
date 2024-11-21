import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef, Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {IProduct, ProductsService} from "../../_services/products/products.service";
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {CreateProductComponent} from "./dialog/create/create.component";
import {DynamicModalService} from "../../_services/dynamic-modal/dynamic-modal.service";

declare global {
  interface Window {
    bootstrap: any; // Khai báo bootstrap trong window
  }
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  products: IProduct[] = [];
  titleCreateProduct: string = "Create product";
  @ViewChild('formContent') formContent!: CreateProductComponent;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductsService,
    private modalService: DynamicModalService
  ) {

  }

  ngOnInit(): void {
    this.subscription.add(
      this.productService.filteredProducts$.subscribe((pr) => {
          this.products = pr;
        }
      ))
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      // Lắng nghe sự kiện modal đóng
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.cleanupBackdrop(); // Xóa modal-backdrop khi modal đóng
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal() {
    this.modalService.openModal(CreateProductComponent, 'Dynamic Modal Title', { example: 'Example Data' });
  }

  private cleanupBackdrop(): void {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove(); // Xóa backdrop
    }

    const body = document.body;
    if (body.classList.contains('modal-open')) {
      body.classList.remove('modal-open'); // Xóa lớp modal-open trên body
    }
  }

  setFilter(filter: string): void {
    this.productService.setFilter(filter);
  }

  onSaveCreate() {
    const formData = this.formContent.getDataForm();
    console.log("formData", formData);
    const product: IProduct = {
      color: "red",
      id: Date.now(),
      name: formData?.name,
      price: formData?.price,
      complete: false,
      createdAt: this.productService.formatDate(),
      updatedAt: this.productService.formatDate()
    }
    this.productService.addProduct(product);
    this.onModalClose();
  }

  createProduct(): void {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      const bootstrapModal = new window.bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  onModalClose(): void {
    console.log('Modal has been closed!');
    const modal = document.getElementById('exampleModal');
    const bootstrapModal = new window.bootstrap.Modal(modal);
    bootstrapModal.hide();

    const body = document.body;
    body.classList.remove('modal-open');

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove(); // Xóa lớp backdrop
    }

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

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.setFilter(value);
  }

  deleteProduct(id: number): void {
    this.productService.deleteItem(id);
  }
}
