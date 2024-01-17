import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent {
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10 // number of rows per page
    };
  }
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  categoryArray : any[] =[];
  pic: string="";
  name: string="";

  constructor(private http: HttpClient){
    this.getAllCategory();
  }

  getAllCategory(){
    this.http.get("http://localhost:8000/api/category").subscribe((resultData: any)=>{
      console.log(resultData);
      this.categoryArray=resultData;
    });
  }
}
