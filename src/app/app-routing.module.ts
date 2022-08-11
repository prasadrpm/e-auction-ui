import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductDetailsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
