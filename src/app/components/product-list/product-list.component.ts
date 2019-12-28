import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  columnsToDisplay: string[] = ['name', 'container', 'size', 'price', 'stock', 'provider'];
  expandedElement: Product | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        res => {
          this.products = res;
          console.log(this.products);
        },
        err => console.log(err)
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

// https://material.angular.io/components/table/overview

// https://stackblitz.com/angular/aeynbebbdqg?file=src%2Fapp%2Ftable-pagination-example.ts

// https://github.com/MarkitoV/studentsLab-client/blob/master/src/app/laboratory/past-laboratories/past-laboratories.component.ts