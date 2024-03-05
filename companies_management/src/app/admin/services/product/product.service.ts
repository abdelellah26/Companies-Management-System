import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from './Product';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  REST_API: string ='http://localhost:8000/api/product';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) {

   }
    headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });

  addProduct(data:Product):Observable<any>{
    let API_URL =`${this.REST_API}`;
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('pic', data.pic, data.pic.name);
    formData.append('id_category', data.id_category);
    formData.append('sku', data.sku);
    formData.append('minimum_quantity', data.minimum_quantity);
    formData.append('moyen_purchase_price', data.moyen_purchase_price);
    formData.append('selling_price', data.selling_price);
    formData.append('quantity', data.quantity);
    return this.httpClient.post(API_URL,formData,{ headers: this.headers }).pipe(catchError(this.handleError))
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}`, { headers: this.headers }).pipe(catchError(this.handleError));
  }

    getProduct(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;

    return this.httpClient.get(API_URL,{ headers: this.headers })
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
  }

  updateProduct(data: Product,id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('pic', data.pic, data.pic.name);
    formData.append('id_category', data.id_category);
    formData.append('sku', data.sku);
    formData.append('minimum_quantity', data.minimum_quantity);
    formData.append('moyen_purchase_price', data.moyen_purchase_price);
    formData.append('selling_price', data.selling_price);
    formData.append('quantity', data.quantity);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    return this.httpClient.put(API_URL, formData,{ headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  deleteProduct(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL,{ headers:this.headers })
    .pipe(catchError(this.handleError))
  }


   handleError(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage =error.error.message;
    }else{
      errorMessage =`Error Code: ${error.status} Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
   }
}
