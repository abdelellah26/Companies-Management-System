import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { Product } from '../../services/product/Product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  ProductForm: FormGroup ;
  categories:any=[];
  selectedFile: File|undefined;
  getId:any;

  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private productService: ProductService,
    private category: CategoryService,
    private activateRoute:ActivatedRoute
  ){
    this.getId=this.activateRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(this.getId).subscribe(res => {

        this.ProductForm.setValue({
          name: res.products[0]['name'],
          id_category: res.products[0]['category'],
          sku: res.products[0]['sku'],
          quantity: 0,
          minimum_quantity: res.products[0]['minimum_quantity'],
          selling_price: res.products[0]['selling_price'],
          moyen_purchase_price: res.products[0]['moyen_purchase_price']
        });
    });

      this.ProductForm=this.formBuilder.group({
        name: '',
        id_category: '',
        sku: '',
        minimum_quantity: '',
        selling_price: '',
        quantity: '',
        moyen_purchase_price: ''
      })
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
  onUpdate(): void {
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


      this.productService.updateProduct(product,this.getId)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Products'));
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
