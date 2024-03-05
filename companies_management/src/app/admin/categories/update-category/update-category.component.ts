import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../services/category/Category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  updateForm: FormGroup;
  selectedFile: File|undefined;
  getId:any;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private ngZone:NgZone,
    private categoryService: CategoryService
  ){
    this.getId=this.activateRoute.snapshot.paramMap.get('id');
    this.updateForm = this.formBuilder.group({

    });
    this.categoryService.getCategory(this.getId).subscribe(res=>{
      console.log(res);
      this.updateForm.setValue({
        name: ['name'],
        pic: ['pic']
      });

    });
    this.updateForm=this.formBuilder.group({
      name: ['name'],
      pic: ['pic']
    })
    this.selectedFile= undefined;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  onUpdate(): void {
    this.categoryService.updateCategory(this.updateForm.value,this.getId)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Clients'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

}
