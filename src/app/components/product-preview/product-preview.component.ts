import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';

// Error when invalid control is dirty, touched or submitted.
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {

  // for validations
  requiredFormControl = new FormControl('', Validators.required);
  matcher = new MyErrorStateMatcher();

  id: string;
  product: Product;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( params => {
      this.id = params['id'];
      this.productService.getProduct(this.id)
        .subscribe(
          res => {
            this.product = res;
          },
          err => console.log(err)
        );
    });
  }

}

// https://www.youtube.com/watch?v=4MEsROoq5Qw
// 1:14:13