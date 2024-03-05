import { Component, OnInit,NgZone} from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../services/category/Category';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories:any=[];
  imageDirectoyPath:any='http://127.0.0.1:8000/';
  isDropdownOpenMap: { [categoryId: number]: boolean } = {};

  constructor(private categoryService: CategoryService, private zone: NgZone){}

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10 // number of rows per page
    };

    this.categoryService.getCategories().subscribe(res=>{
      this.categories=res;
    })


  }
  toggleDropdown(categoryId: number) {
    // Toggle the dropdown state for the specific client
    this.isDropdownOpenMap[categoryId] = !this.isDropdownOpenMap[categoryId];
  }

  delete(id:any,i:any){
    this.categoryService.deleteCategory(id).subscribe(res =>{
      this.categories.splice(i,1);
      delete this.isDropdownOpenMap[id];
    })
   }


}
