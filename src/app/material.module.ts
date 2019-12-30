import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule
  ]
})
export class MaterialModule {}