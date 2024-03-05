import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../services/category/Category';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent {
  categoryForm: FormGroup;
  selectedFile: File|undefined;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private categoryService: CategoryService
  ){
    this.categoryForm = this.formBuilder.group({
      name: [''],
    });

    this.selectedFile= undefined;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  onSubmit(): void {
    if (this.selectedFile !== undefined) {
        const category: Category = {
          name: this.categoryForm.value.name,
          pic: this.selectedFile
        };

        this.categoryService.addCategory(category)
        .subscribe(
          () => {
            console.log('Data added successfully');
            this.ngZone.run(() => this.router.navigateByUrl('/Categories'));
          },
          (error) => {
            console.error('Error:', error);
          }
        );

    }else{
      console.error('No file selected.');
    }
  }




}
