import { Injectable } from '@angular/core';
import { ApiService } from '../api/ApiService';

@Injectable()
export class RecentProductsService {

  constructor(private apiService: ApiService) {
  }

  getRecentProducts() {
    return this.apiService.get('/products?recent');
  }

}
