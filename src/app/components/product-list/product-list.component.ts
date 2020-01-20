import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';

export interface DialogData {
  id: string;
}

// Custom options to configure the tooltips's default show/hide delays.
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 500
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
  id: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog) { }

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

  showProduct(id: string) {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteProduct, {
      width: '275px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(id => {
      this.id = id;
      console.log('The dialog was closed');
      if (id) {
        this.deleteProduct(id);
      }
    });
  }
}

@Component({
  selector: 'dialog-delete-product',
  templateUrl: 'dialog-delete-product.html'
})
export class DialogDeleteProduct {
  constructor(public dialogRef: MatDialogRef<DialogDeleteProduct>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// https://material.angular.io/components/table/overview

// https://stackblitz.com/angular/aeynbebbdqg?file=src%2Fapp%2Ftable-pagination-example.ts

// https://github.com/MarkitoV/studentsLab-client/blob/master/src/app/laboratory/past-laboratories/past-laboratories.component.ts