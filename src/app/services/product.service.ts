import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URI = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  createProduct(name: string, container: string, size: string, description: string, price: string, stock: string, provider: string, image: File) {

    const fd = new FormData();
    fd.append('name', name);
    fd.append('container', container);
    fd.append('size', size);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('stock', stock);
    fd.append('image', image);
    fd.append('provider', provider);

    return this.http.post(this.URI, fd);
  }

  getProducts() {

    // return this.http.get<Product[]>(this.URI);
    return this.http.get<any>(this.URI);
  }
}
