import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{
  dtOptions:any = {};
  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10
    };
  }

}
