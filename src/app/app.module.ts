// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component'; // Adjusted path

const routes: Routes = [
  { path: '', component: OrderComponent }, // Default route
  { path: 'orders', component: OrderComponent } // Optional explicit route
];

@NgModule({
  declarations: [AppComponent, OrderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}