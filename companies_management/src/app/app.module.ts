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
import { PosComponent } from './pos/pos.component';
import { HeaderPosComponent } from './pos/header-pos/header-pos.component';
import { HeaderCategoriesComponent } from './pos/header-categories/header-categories.component';

import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    PosComponent,
    HeaderPosComponent,
    HeaderCategoriesComponent,

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
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
