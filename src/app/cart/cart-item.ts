export class CartItem {

  quantity = 1;

  pizza: any;

  constructor(pizza: any) {
    this.pizza = pizza;
  }

  get lineTotal() {
    return this.quantity * 4.99;
  }

}
