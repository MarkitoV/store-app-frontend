import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, MatInputModule, MatTableModule, MatPaginatorModule
  ]
})
export class MaterialModule {}