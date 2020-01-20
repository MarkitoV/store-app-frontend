import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { ProductListComponent, DialogDeleteProduct } from './components/product-list/product-list.component';

@NgModule({
  entryComponents: [
    DialogDeleteProduct
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductListComponent,
    DialogDeleteProduct
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
