import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

import { ProductService } from '../../services/product.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

// Custom options to configure the tooltip's default show/hide delays.
export const myCustomTooltipDefault: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000
};

// Error when invalid control is dirty, touched or submitted.
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefault }
  ]
})
export class ProductFormComponent implements OnInit {

  // for validations
  requiredFormControl = new FormControl('', Validators.required);
  matcher = new MyErrorStateMatcher();
  // for product image
  file: File;
  productSelected: string | ArrayBuffer;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onProductSelected(event: HtmlInputEvent): void {

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.productSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadProduct(name: HTMLInputElement, container: HTMLInputElement, size: HTMLInputElement, description: HTMLTextAreaElement, price: HTMLInputElement, stock: HTMLInputElement, provider: HTMLInputElement): boolean {

    this.productService.createProduct(name.value, container.value, size.value, description.value, price.value, stock.value, provider.value, this.file)
      .subscribe(res => console.log(res), err => console.log(err));

    return false;
  }

}
