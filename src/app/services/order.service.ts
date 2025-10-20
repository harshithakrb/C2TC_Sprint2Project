import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // Corrected base URL

  constructor(private http: HttpClient) {}

  // Create a new order
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  // Get all orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get order by ID
  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update an order
  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, order);
  }

  // Delete an order
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}