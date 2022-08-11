import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Bid } from './bid.model';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  products: Product[] = [];
  productForm: FormGroup = this.formBuilder.group({
    product: [''],
    productName: [''],
    category: [''],
    shortDesc: [''],
    detailedDesc: [''],
    startingPrice: [''],
    bidEndDate: ['']
  });
  bidDataSource = new MatTableDataSource<Bid>([]);
  bidColumnDef = ['bidAmount', 'name', 'email', 'mobile'];

  
  get Category(){
    return this.productForm?.value.product.category;
  }

  constructor(private productService: ProductService
    , private formBuilder: FormBuilder ) { }
  
  ngOnInit(): void {
    this.getProduct();
    console.log('Selected Product'+ this.productForm.value.product);
  }

  getProduct(){
    return this.productService.getProducts().subscribe(
      res => this.products = res
    );
  }
  productOnchange(event: any) {
      console.log('Selection change' + event.source.value);
      const selectedProduct = this.products.find(p => p.productId === event.source.value);
      if (selectedProduct) {
        this.productForm.patchValue({
          productName: [selectedProduct.productName],
          category: [selectedProduct.category],
          shortDesc: [selectedProduct.shortDesc],
          detailedDesc: [selectedProduct.detailedDesc],
          startingPrice: [selectedProduct.startingPrice],
          bidEndDate: [selectedProduct.bidEndDate]
        });
        this.productService.getBids(selectedProduct.productId).subscribe(
          res => {
            this.bidDataSource = new MatTableDataSource(res);
          }
        );
      }
  }
}
