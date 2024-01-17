import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateCategory } from './create-category.model';
import { DataCategoryService } from '../../services/data-category.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent {
  files:any;
  submitted=false;
  data:any;
  form: FormGroup;
  post=new CreateCategory()
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,
    private dataService: DataCategoryService){
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        pic: [null, Validators.required]
      });
  }

  createForm(){
    this.form= this.formBuilder.group({
      name: ['', Validators.required],
      pic: [null, Validators.required]
    });
  }

  get f(){
    return this.form.controls;
  }
  uploadImage(event:any){
    this.files=event.target.files[0];
    console.log(this.files);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid || !this.files) {
      return;
    }

    const formData = new FormData();
    formData.append("pic", this.files, this.files.name);

    this.dataService.uploadData(formData).subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }


}
