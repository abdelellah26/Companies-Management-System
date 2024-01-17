import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDeliveryManService {

  private apiUrl = 'http://localhost:8000/api/deliveryMan';

  constructor(private http: HttpClient) {}

  getAllDeliveryMans(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'), 
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
