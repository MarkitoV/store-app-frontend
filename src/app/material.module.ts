import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule
  ]
})
export class MaterialModule {}