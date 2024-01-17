import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllProductsComponent } from './admin/products/all-products/all-products.component';
import { AllCategoriesComponent } from './admin/categories/all-categories/all-categories.component';

import { LoginComponent } from './login/login.component';
import { AllVendorsComponent } from './admin/users/vendors/all-vendors/all-vendors.component';
import { CreateVendorsComponent } from './admin/users/vendors/create-vendors/create-vendors.component';
import { AllClientsComponent } from './admin/users/clients/all-clients/all-clients.component';
import { AllDeliveryMansComponent } from './admin/users/delivery_man/all-delivery-mans/all-delivery-mans.component';
import { CreateClientsComponent } from './admin/users/clients/create-clients/create-clients.component';
import { CreateDeliveryMansComponent } from './admin/users/delivery_man/create-delivery-mans/create-delivery-mans.component';
import { ProfilComponent } from './admin/profil/profil.component';
import { CreateCategoriesComponent } from './admin/categories/create-categories/create-categories.component';
import { PosComponent } from './pos/pos.component';
import { CreateProductsComponent } from './admin/products/create-products/create-products.component';


const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"Dashboard", component: DashboardComponent},
  {path:"Products", component: AllProductsComponent},
  {path:"Create-Product" ,component: CreateProductsComponent},
  {path:"Categories", component: AllCategoriesComponent},
  {path:"Create-category",component: CreateCategoriesComponent},
  {path:"vendors", component: AllVendorsComponent},
  {path:"Create-vendor", component: CreateVendorsComponent},
  {path:"Clients", component: AllClientsComponent},
  {path:"Create-Client", component: CreateClientsComponent },
  {path:"Delivery-Mans", component: AllDeliveryMansComponent},
  {path:"Create-Delivery-Mans", component: CreateDeliveryMansComponent },
  {path:"Profil", component: ProfilComponent},



  {path:"Pos",component: PosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
