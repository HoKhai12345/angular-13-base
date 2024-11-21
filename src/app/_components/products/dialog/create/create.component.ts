import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../../_services/products/products.service";
import { debounceTime} from "rxjs";

@Component({
  selector: 'app-create-product',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateProductComponent implements OnInit {
  formCreate!: FormGroup;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    @Inject('data') public data: any
  ) {}
  ngOnInit(): void {
    this.initFormCreate();
    this.eventChangeForm();
  }

  initFormCreate(): void {
    this.formCreate = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      price: [1000, [Validators.required, Validators.minLength(1000), Validators.maxLength(1000000)]],
      status: [true],
    })
  }

  saveData() {
    this.save.emit(this.formCreate.value); // Emit dữ liệu khi nhấn Save
  }

  closeModal() {
    this.close.emit();
  }

  logSomething() {
    console.log('Child component action', this.data);
  }

  eventChangeForm(): void {
    this.formCreate?.get('price')?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value: any) => {
      if (value < 1000) {
        this.formCreate?.get('price')?.setValue(1000, { emitEvent: false });
      } else if (value > 1000000) {
        this.formCreate?.get('price')?.setValue(1000000, { emitEvent: false });
      }
    });
  }

  getDataForm(): any {
    return this.formCreate.value;
  }

}
