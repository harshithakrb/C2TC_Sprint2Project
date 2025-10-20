import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  newOrder: any = {
    orderId: null,
    customerId: '',
    orderDate: new Date().toISOString().slice(0, 16),
    productName: '',
    quantity: '',
    price: '',
    discount: '',
    totalPrice: null,
    orderStatus: 'Pending',
    paymentMode: '',
    deliveryType: '',
    updatedAt: null
  };
  editMode: boolean = false;
  stockStatus: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    console.log('Loading orders...');
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('Orders fetched:', data);
        this.orders = data;
      },
      error: (error) => console.error('Error fetching orders:', error)
    });
  }

  submitForm() {
    const orderData = {
      ...this.newOrder,
      customerId: Number(this.newOrder.customerId) || 0,
      quantity: Number(this.newOrder.quantity) || 0,
      price: Number(this.newOrder.price) || 0,
      discount: Number(this.newOrder.discount) || 0,
      orderDate: new Date(this.newOrder.orderDate).toISOString()
    };
    console.log('Submitting order data:', orderData);
    if (this.editMode && orderData.orderId) {
      this.orderService.updateOrder(orderData.orderId, orderData).subscribe({
        next: (response) => {
          console.log('Order updated:', response);
          this.loadOrders();
          this.resetForm();
          this.editMode = false;
          alert('Order updated successfully! ✨');
        },
        error: (error) => console.error('Error updating order:', error)
      });
    } else {
      delete orderData.orderId;
      this.orderService.createOrder(orderData).subscribe({
        next: (response) => {
          console.log('Order created:', response);
          this.loadOrders();
          this.resetForm();
          alert('Order submitted successfully! 🎉');
        },
        error: (error) => console.error('Error creating order:', error)
      });
    }
  }

  editOrder(order: any) {
    this.newOrder = { ...order };
    this.editMode = true;
    this.checkStockStatus();
  }

  deleteOrder(orderId: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          console.log('Order deleted:', orderId);
          this.loadOrders();
          alert('Order deleted successfully! 🗑️');
        },
        error: (error) => console.error('Error deleting order:', error)
      });
    }
  }

  cancelEdit() {
    this.resetForm();
    this.editMode = false;
    this.stockStatus = '';
  }

  resetForm() {
    this.newOrder = {
      orderId: null,
      customerId: '',
      orderDate: new Date().toISOString().slice(0, 16),
      productName: '',
      quantity: '',
      price: '',
      discount: '',
      totalPrice: null,
      orderStatus: 'Pending',
      paymentMode: '',
      deliveryType: '',
      updatedAt: null
    };
    this.stockStatus = '';
  }

  checkStockStatus() {
    const inStockItems = ['tshirt', 'pizza', 'mobile', 'cosmetics', 'speaker'];
    const outOfStockItems = ['chocolate', 'cake', 'burger'];
    const product = this.newOrder.productName.toLowerCase().trim();
    if (inStockItems.includes(product)) {
      this.stockStatus = `✅ ${product} is In Stock!`;
    } else if (outOfStockItems.includes(product)) {
      this.stockStatus = `❌ ${product} is Out of Stock!`;
    } else {
      this.stockStatus = `ℹ️ ${product} status is unknown.`;
    }
  }

  // New methods for totals
  getTotalOrders(): number {
    return this.orders.length;
  }

  getTotalRevenue(): number {
    return this.orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  }
}