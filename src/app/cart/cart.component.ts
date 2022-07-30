import {Component, OnInit, Injectable} from '@angular/core';
import {CartService} from './cart-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router/';


@Component({
  selector: 'product-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['./cart.component.css']

})

@Injectable()
export class CartComponent implements OnInit {

  model = {
    deliveryName: '',
    deliveryStreet: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZip: '',
    ccNumber: '',
    ccExpiration: '',
    ccCVV: '',
    products: []
  };

  constructor(private cart: CartService, private httpClient: HttpClient) {
    this.cart = cart;
  }

  ngOnInit() {
  }

  get cartItems() {
    return this.cart.getItemsInCart();
  }

  get cartTotal() {
    return this.cart.getCartTotal();
  }

  onSubmit() {
    // this.model.products = this.cart.getItemsInCart();
    this.cart.getItemsInCart()
      .forEach(cartItem => {
          return this.model.products.push(cartItem.pizza);
        }
      );

    this.httpClient.post('/api/orders', this.model, {
        headers:
          new HttpHeaders()
            .set('Content-type', 'application/json')
            .set('Accept', 'application/json'),
      }
    )
      .subscribe(r => this.cart.emptyCart());

    // TODO: Do something after this...navigate to a thank you page or something
  }

}
