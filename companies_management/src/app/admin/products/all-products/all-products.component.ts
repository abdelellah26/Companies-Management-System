import { Component, OnInit,NgZone} from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../services/product/Product';
declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit  {

  products:any=[];
  imageDirectoyPath:any='http://127.0.0.1:8000/';
  isDropdownOpenMap: { [productId: number]: boolean } = {};
  constructor(private productService: ProductService, private zone: NgZone){}

  dtOptions:any = {};
  ngOnInit(): void {

    this.zone.run(() => {
      this.productService.getProducts().subscribe(
        res => {
          // Vérifiez si la propriété 'data' existe dans la réponse et est un tableau
          if (res && 'data' in res && Array.isArray(res.data)) {
            this.products = res.data as Product[];
          } else {
            console.error('The "data" property in the API response is invalid.');
          }
        },
        error => {
          console.error('Erreur API :', error);
        }
      );
    });
    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10 // number of rows per page
    };


  }


  toggleDropdown(productId: number) {
    // Toggle the dropdown state for the specific client
    this.isDropdownOpenMap[productId] = !this.isDropdownOpenMap[productId];
  }

   delete(id:any,i:any){
    console.log(id);
    this.productService.deleteProduct(id).subscribe(res =>{
      this.products.splice(i,1);
      delete this.isDropdownOpenMap[id];
    })
   }


}
