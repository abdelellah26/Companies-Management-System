import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../services/category/Category';
import { Product } from '../../services/product/Product';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent {
  ProductForm: FormGroup;
  categories:any=[];
  selectedFile: File|undefined;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private productService: ProductService,
    private category: CategoryService
  ){
    this.ProductForm = this.formBuilder.group({
      id_category: [''],
      name: [''],
      sku: [''],
      minimum_quantity: [''],
      quantity: [''],
      moyen_purchase_price: [''],
      selling_price: ['']
    })

    this.selectedFile= undefined;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.category.getCategories().subscribe(res=>{
        this.categories=res;
      })
    });
  }
  onSubmit():void{
    if (this.selectedFile !== undefined){
      const product: Product = {
        id_category: this.ProductForm.value.id_category ,
        name: this.ProductForm.value.name,
        sku: this.ProductForm.value.sku,
        minimum_quantity: this.ProductForm.value.minimum_quantity,
        quantity: this.ProductForm.value.quantity,
        moyen_purchase_price: this.ProductForm.value.moyen_purchase_price,
        selling_price: this.ProductForm.value.selling_price,
        pic: this.selectedFile
      };
      this.productService.addProduct(product)
      .subscribe(()=>{
        console.log('Data added successfully')
        this.ngZone.run(()=>this.router.navigateByUrl('/Products'))
      },(err)=>{
        console.log(err)
      })
    }else{
      console.error('No file selected.');
    }

  }
}
