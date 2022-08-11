import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bid } from './bid.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly url = '/api/v1/product/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.productServiceBaseUrl + 'list-products');
  }

  getBids(productId: number): Observable<Bid[]> {
    return this.http.get<Bid[]>(environment.bidServiceBaseUrl+ productId);
  }
}
