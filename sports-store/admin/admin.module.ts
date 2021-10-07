import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin.component';
import {AuthGuard} from './auth.guard';
import {ProductEditorComponent} from './product-editor.component';
import {ProductTableComponent} from './product-table.component';
import {OrderTableComponent} from './order-table.component';
import {MaterialModule} from "../../material.module";
import {AuthSnackComponent} from "./auth-snack.component";

const routing = RouterModule.forChild([
  // { path: 'auth', component: AuthComponent },
  { path: 'auth', component: AdminComponent },
  { path: 'main', component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'products/:mode/:id', component: ProductEditorComponent },
      { path: 'products/:mode', component: ProductEditorComponent },
      { path: 'products', component: ProductTableComponent },
      { path: 'orders', component: OrderTableComponent },
      { path: '**', redirectTo: 'products' }
    ]
  },
  { path: '**', redirectTo: 'auth' }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, MaterialModule],
  providers: [AuthGuard],
  declarations: [
    AuthComponent,
    AdminComponent,
    ProductTableComponent,
    ProductEditorComponent,
    OrderTableComponent,
    AuthSnackComponent
  ]
})
export class AdminModule { }
