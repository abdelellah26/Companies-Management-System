import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Vendor } from './Vendor';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  REST_API: string ='http://localhost:8000/api/vendor';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });

  addVendor(data:Vendor):Observable<any>{
    let API_URL =`${this.REST_API}`;
    return this.httpClient.post(API_URL,data,{ headers:this.headers}).pipe(catchError(this.handleError));
  }

  getVendors(){
    return this.httpClient.get(`${this.REST_API}`,{ headers:this.headers}).pipe(catchError(this.handleError));
  }

  getVendor(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{ headers:this.headers})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
  }

  updateVendor(data: Vendor,id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  deleteVendor(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.headers })
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
