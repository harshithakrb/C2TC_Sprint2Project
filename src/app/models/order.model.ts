export interface Order {
  orderId: number;
  customerId: number;
  orderDate: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  totalPrice: number;
  orderStatus: string;
  paymentMode: string;
  deliveryType: string;
  createdAt: string;
  updatedAt: string;
}
