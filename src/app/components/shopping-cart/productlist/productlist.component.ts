import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Shared/ProductServices/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
productlist:any;
  constructor(public productservice:ProductService) {

   }

  ngOnInit(): void {
    this.getproductlist();
  }
  getproductlist(){
    this.productlist=this.productservice.getproducts();
    console.log(this.productlist);
  }

}
