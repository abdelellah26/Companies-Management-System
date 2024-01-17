import { Component, OnInit} from '@angular/core';
import { LogoutService } from 'src/app/service/auth/logout/logout.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dashboard=[
    {
      number: '1',
      name: 'Dashboard',
      icon: 'bi bi-grid',
      route: '/Dashboard',
    }
  ]

  products=[
    {
      number: '1',
      name: 'Products',
      icon: 'bi bi-box',
      route: '/Products',
    },
    {
      number: '2',
      name: 'Add product',
      icon: 'bi bi-plus-square',
      route: '/Create-Product',

    },
    {
      number: '3',
      name: 'Category',
      icon: 'bi bi-tag',
      route: '/Categories',

    }

  ]
  sales=[
    {
      number: '1',
      name: 'Sales',
      icon: 'bi bi-cart',
      route: '/Dashboard',
    },
    {
      number: '2',
      name: 'Invoices',
      icon: 'bi bi-file-text',
      route: '/Dashboard',
    },
    {
      number: '3',
      name: 'Pos',
      icon: 'bi bi-tablet-landscape',
      route: '/Dashboard',
    }
  ]
  peoples=[
    {
      number: '1',
      name: 'Cliens',
      icon: 'bi bi-people',
      route: '/Clients',
    },
    {
      number: '2',
      name: 'Vendors',
      icon: 'bi bi-person-check',
      route: '/vendors',
    },
    {
      number: '3',
      name: 'Delivery Mans',
      icon: 'bi bi-truck',
      route: '/Delivery-Mans',
    }
  ]
  settings=[
    {
      number: '1',
      name: 'Settings',
      icon: 'bi bi-gear',
      showChildren: false,
      children:[
        {
          number: '1',
          name: 'Product Details',
          route: '/Dashboard',
        },
      ]
    },
    {
      number: '2',
      name: 'Logout',
      icon: 'bi bi-box-arrow-right',
      route: '/',
    }
  ]

  constructor(private logoutService: LogoutService) {}

  ngOnInit(): void {
    $(".collapseSidebar").on("click",function(e){
      $(".vertical").hasClass("narrow")?$(".vertical").toggleClass("open"):($(".vertical").toggleClass("collapsed"),
      $(".vertical").hasClass("hover")&&$(".vertical").removeClass("hover")), e.preventDefault()}),

  $(".sidebar-left").hover(function(){
          $(".vertical").hasClass("collapsed")&&$(".vertical").addClass("hover"),
          $(".narrow").hasClass("open")||$(".vertical").addClass("hover")},
      function(){
              $(".vertical").hasClass("collapsed")&&$(".vertical").removeClass("hover"),
              $(".narrow").hasClass("open")||$(".vertical").removeClass("hover")}),


  $(".navbar .dropdown").on("hidden.bs.dropdown",function(){
      $(this).find("li.dropdown").removeClass("show open"),$(this).find("ul.dropdown-menu").removeClass("show open")});


 }

    toggleChildren(item: any) {
         // If the clicked item is the "Logout" item, perform logout
    if (item.name === 'Logout') {
      this.logoutService.logout();
    } else {
      // Toggle the showChildren property for other items with children
      item.showChildren = !item.showChildren;
    }
    }


}

