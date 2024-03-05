import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  REST_API: string ='http://localhost:8000/api/year';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
    headers = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken() // Ajoutez le jeton d'authentification
  });

  getYear(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;

    return this.httpClient.get(API_URL,{ headers: this.headers })
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError))
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
