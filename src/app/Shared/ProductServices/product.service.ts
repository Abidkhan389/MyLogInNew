import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'src/app/Model/Product/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //private headers:HttpHeaders;
  readonly ApiUrl="https://localhost:44324/api/";
  public currentUser:any;
  products:Products[]=[
    new Products (1,'Product 1','This is product 1 description. The is really cool',100,),
    new Products (2,'Product 2','This is product 2 description. The is really cool',200,),
    new Products (3,'Product 3','This is product 3 description. The is really cool',300,),
    new Products (4,'Product 4','This is product 4 description. The is really cool',400,),
    new Products (5,'Product 5','This is product 5 description. The is really cool',500,),
    new Products (6,'Product 6','This is product 6 description. The is really cool',600,),
    new Products (7,'Product 7','This is product 7 description. The is really cool',700,),
    new Products (8,'Product 8','This is product 8 description. The is really cool',800,),
    new Products (9,'Product 9','This is product 9 description. The is really cool',900,),
  ];
  constructor(private http:HttpClient)
  {

  }
  getproducts(){
    return this.products;
  }
}


