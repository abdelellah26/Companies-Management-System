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

import { CreateProductsComponent } from './admin/products/create-products/create-products.component';
import { CreateNeighborhoodComponent } from './admin/neighborhoods/create-neighborhood/create-neighborhood.component';
import { UpdateClientComponent } from './admin/users/clients/update-client/update-client.component';
import { AdminGuard } from './admin/guard/admin-auth-guard.guard';
import { UpdateDeliveryManComponent } from './admin/users/delivery_man/update-delivery-man/update-delivery-man.component';
import { UpdateVendorComponent } from './admin/users/vendors/update-vendor/update-vendor.component';
import { UpdateCategoryComponent } from './admin/categories/update-category/update-category.component';
import { AllOrdersComponent } from './admin/orders/all-orders/all-orders.component';
import { UpdateProductComponent } from './admin/products/update-product/update-product.component';
import { DetailProductComponent } from './admin/products/detail-product/detail-product.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"Dashboard", component: DashboardComponent, canActivate: [AdminGuard]},

  {path:"Products", component: AllProductsComponent, canActivate: [AdminGuard]},
  {path:"Create-Product" ,component: CreateProductsComponent, canActivate: [AdminGuard]},
  {path:"Update-Product/:id",component:UpdateProductComponent, canActivate: [AdminGuard]},
  {path:"Deteil-Product/:id",component:DetailProductComponent, canActivate: [AdminGuard]},


  {path:"Categories", component: AllCategoriesComponent, canActivate: [AdminGuard]},
  {path:"Create-category",component: CreateCategoriesComponent, canActivate: [AdminGuard]},
  {path:"vendors", component: AllVendorsComponent, canActivate: [AdminGuard]},
  {path:"Create-vendor", component: CreateVendorsComponent, canActivate: [AdminGuard]},
  {path:"Clients", component: AllClientsComponent, canActivate: [AdminGuard]},
  {path:"Create-Client", component: CreateClientsComponent , canActivate: [AdminGuard]},
  {path:"Update-Client/:id",component:UpdateClientComponent, canActivate: [AdminGuard]},
  {path:"Update-DeliveryMan/:id",component:UpdateDeliveryManComponent, canActivate: [AdminGuard]},
  {path:"Update-Vendor/:id",component:UpdateVendorComponent, canActivate: [AdminGuard]},
  {path:"Update-Category/:id",component:UpdateCategoryComponent, canActivate: [AdminGuard]},
  {path:"Delivery-Mans", component: AllDeliveryMansComponent, canActivate: [AdminGuard]},
  {path:"Create-Delivery-Mans", component: CreateDeliveryMansComponent, canActivate: [AdminGuard] },
  {path:"Profil", component: ProfilComponent, canActivate: [AdminGuard]},
  {path:"create-Neiborhood",component: CreateNeighborhoodComponent, canActivate: [AdminGuard]},
  {path:"sales",component: AllOrdersComponent, canActivate: [AdminGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
