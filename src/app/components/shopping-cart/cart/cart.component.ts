import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Model/Product/Products';
import { MessengerService } from 'src/app/Shared/ProductServices/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
// cartItems=[
  // {id:1,productId:1,productName:'Test 1', qty:2,price:100},
  // {id:2,productId:2,productName:'Test 2',qty:3,price:100},
  // {id:3,productId:7,productName:'Test 3',qty:2,price:200},
  // {id:4,productId:4,productName:'Test 4',qty:1,price:150},
// ];
cartTotal=0;
cartItems:any;
  constructor(private msg:MessengerService) {
   }

  ngOnInit(): void {
    this.msg.getMsg().subscribe( (product:any) => {
      this.addproducttocart(product);
    });
  }
  addproducttocart(product:Products){
    let productExists= false;
    for(let i in this.cartItems)
      {
        if(this.cartItems[i].productId === product.id)
        {
          this.cartItems[i].qty++;
          productExists=true;
          break;
        }
      }

    if(!productExists)
    {
      this.cartItems.push({
        productId:product.id,
        productName:product.name,
        qty:1,
        price:product.price
      })
    }
    // else
    // {
    //   for(let i in this.cartItems)
    //   {
    //     if(this.cartItems[i].productId === product.id)
    //     {
    //       this.cartItems[i].qty++;
    //       break;
    //     }
    //     else
    //     {
    //       this.cartItems.push({
    //         productId:product.id,
    //         productName:product.name,
    //         qty:1,
    //         price:product.price
    //       })
    //     }
    //   }
    // }
    this.cartTotal=0
    this.cartItems.forEach( (data: { qty: number; price: number; })=>{
      this.cartTotal+=(data.qty * data.price)
      debugger;
    })
  }

}
