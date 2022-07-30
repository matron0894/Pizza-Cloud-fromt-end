import {Component, OnInit, Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CartService} from '../cart/cart-service';

@Component({
  selector: 'product-design',
  templateUrl: 'design.component.html',
  styleUrls: ['./design.component.css']
})

@Injectable()
export class DesignComponent implements OnInit {

  model = {
        name: '',
        ingredients: []
  };

  allIngredients: any;
  wraps = [];
  proteins = [];
  veggies = [];
  cheeses = [];
  sauces = [];

  constructor(private httpClient: HttpClient, private router: Router, private cart: CartService) {
  }

  // tag::ngOnInit[]
  ngOnInit() {
    this.httpClient
      .get('/api/ingredients')
      .subscribe((data) => {
          console.log(data)  // log

          this.allIngredients = (data);

          this.wraps = this.allIngredients.filter(w => w.type === 'WRAP');

          this.proteins = this.allIngredients.filter(p => p.type === 'PROTEIN');

          this.veggies = this.allIngredients.filter(v => v.type === 'VEGGIES');

          this.cheeses = this.allIngredients.filter(c => c.type === 'CHEESE');

          this.sauces = this.allIngredients.filter(s => s.type === 'SAUCE');
        }
      );
  }

  // end::ngOnInit[]

  updateIngredients(ingredient, event) {
    if (event.target.checked) {
      this.model.ingredients.push(ingredient);
    } else {
      this.model.ingredients.splice(this.model.ingredients.findIndex(i => i === ingredient), 1);
    }
  }

  // tag::onSubmit[]
  onSubmit() {
    this.httpClient.post(
      '/api/products',
      this.model, {
        headers: new HttpHeaders().set('Content-type', 'application/json'),
      })
      .subscribe((pizza) => this.cart.addToCart(pizza));

    //location.href = '/cart';
    this.router.navigate(['/cart'])
      .then(() => {
        window.location.reload();
      });
  }

  // end::onSubmit[]

}
