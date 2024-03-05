import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from './Category';
import { AuthService } from 'src/app/service/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  REST_API: string ='http://localhost:8000/api/category';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
   headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });

  addCategory(data: Category):Observable<any> {
    let API_URL = `${this.REST_API}`;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('pic', data.pic, data.pic.name);
    return this.httpClient.post(API_URL, formData, { headers: this.headers }).pipe(catchError(this.handleError))
  }



  getCategories(){
    return this.httpClient.get(`${this.REST_API}`,{ headers: this.headers }).pipe(catchError(this.handleError));
  }

  getCategory(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.post(API_URL,{ headers: this.headers })
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
  }
    updateCategory(data: Category,id: any):Observable<any>{
      let API_URL = `${this.REST_API}/${id}`;
      return this.httpClient.put(API_URL,data,{headers:this.headers })
      .pipe(catchError(this.handleError))
    }

  deleteCategory(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL,{ headers: this.headers })
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
