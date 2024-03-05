import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './admin/layouts/header/header.component';
import { NavbarComponent } from './admin/layouts/navbar/navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllProductsComponent } from './admin/products/all-products/all-products.component';
import { AllCategoriesComponent } from './admin/categories/all-categories/all-categories.component';
import { CreateCategoriesComponent } from './admin/categories/create-categories/create-categories.component';
import { CreateProductsComponent } from './admin/products/create-products/create-products.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AllVendorsComponent } from './admin/users/vendors/all-vendors/all-vendors.component';
import { CreateVendorsComponent } from './admin/users/vendors/create-vendors/create-vendors.component';
import { AllClientsComponent } from './admin/users/clients/all-clients/all-clients.component';
import { CreateClientsComponent } from './admin/users/clients/create-clients/create-clients.component';
import { AllDeliveryMansComponent } from './admin/users/delivery_man/all-delivery-mans/all-delivery-mans.component';
import { CreateDeliveryMansComponent } from './admin/users/delivery_man/create-delivery-mans/create-delivery-mans.component';
import { ProfilComponent } from './admin/profil/profil.component';


import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreateNeighborhoodComponent } from './admin/neighborhoods/create-neighborhood/create-neighborhood.component';
import { UpdateClientComponent } from './admin/users/clients/update-client/update-client.component';
import { UpdateDeliveryManComponent } from './admin/users/delivery_man/update-delivery-man/update-delivery-man.component';
import { UpdateVendorComponent } from './admin/users/vendors/update-vendor/update-vendor.component';
import { UpdateCategoryComponent } from './admin/categories/update-category/update-category.component';
import { UpdateComponent } from './admin/help/update/update.component';
import { AllOrdersComponent } from './admin/orders/all-orders/all-orders.component';
import { UpdateProductComponent } from './admin/products/update-product/update-product.component';
import { DetailProductComponent } from './admin/products/detail-product/detail-product.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    DashboardComponent,
    AllProductsComponent,
    AllCategoriesComponent,
    CreateCategoriesComponent,
    CreateProductsComponent,
    LoginComponent,
    AllVendorsComponent,
    CreateVendorsComponent,
    AllClientsComponent,
    CreateClientsComponent,
    AllDeliveryMansComponent,
    CreateDeliveryMansComponent,
    ProfilComponent,
    CreateNeighborhoodComponent,
    UpdateClientComponent,
    UpdateDeliveryManComponent,
    UpdateVendorComponent,
    UpdateCategoryComponent,
    UpdateComponent,
    AllOrdersComponent,
    UpdateProductComponent,
    DetailProductComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
