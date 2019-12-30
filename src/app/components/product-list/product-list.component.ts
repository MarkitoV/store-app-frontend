import { Component, OnInit, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';

// Custom options to configure the tooltips's default show/hide delays.
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ProductListComponent implements OnInit {

  columnsToDisplay: string[] = ['name', 'container', 'size', 'price', 'stock', 'provider'];
  expandedElement: Product | null;
  // products: Product[] = [];
  products = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        res => {
          // this.products = res;
          this.products = new MatTableDataSource(res);
          console.log(this.products.data);
          this.products.paginator = this.paginator;
          this.products.sort = this.sort;
        },
        err => console.log(err)
      );
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }

}

// https://material.angular.io/components/table/overview

// https://stackblitz.com/angular/aeynbebbdqg?file=src%2Fapp%2Ftable-pagination-example.ts

// https://github.com/MarkitoV/studentsLab-client/blob/master/src/app/laboratory/past-laboratories/past-laboratories.component.ts