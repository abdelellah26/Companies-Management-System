import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Neighborhood } from './Neighborhood';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {
  REST_API: string ='http://localhost:8000/api/neighborhood';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });
  addNeiborhood(data:Neighborhood):Observable<any>{
    let API_URL =`${this.REST_API}`;
    return this.httpClient.post(API_URL,data,{ headers: this.headers }).pipe(catchError(this.handleError));
  }

  getNeiborhoods(){
    return this.httpClient.get(`${this.REST_API}`,{ headers: this.headers }).pipe(catchError(this.handleError));
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
