import { Component, OnInit,Input } from '@angular/core';
import { Products } from 'src/app/Model/Product/Products';
import { MessengerService } from 'src/app/Shared/ProductServices/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()  productItem:any;
  constructor(private msg:MessengerService) {

    this.productItem= new Products();
   }

  ngOnInit(): void {
  }
  handleToCart(){
    this.msg.sendMsg(this.productItem);
  }
}
