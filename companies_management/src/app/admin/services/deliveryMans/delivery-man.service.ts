import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DeliveryMan } from './deliveryMan';
import { AuthService } from 'src/app/service/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DeliveryManService {
  REST_API: string ='http://localhost:8000/api/deliveryMan';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });

  addDeliveryMan(data:DeliveryMan):Observable<any>{
    let API_URL =`${this.REST_API}`;
    return this.httpClient.post(API_URL,data,{ headers:this.headers}).pipe(catchError(this.handleError));
  }

  getDeliveryMans(){
    return this.httpClient.get(`${this.REST_API}`,{ headers:this.headers}).pipe(catchError(this.handleError));
  }

  getDeliveryMan(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{ headers:this.headers})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
  }

  updateDeliveryMan(data: DeliveryMan,id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.headers })
    .pipe(catchError(this.handleError))
  }

  deleteDeliveryMan(id: any):Observable<any>{
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
