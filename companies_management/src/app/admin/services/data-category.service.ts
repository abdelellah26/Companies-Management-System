import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataCategoryService {

  constructor(private http: HttpClient) { }

  uploadData(data: any){
    const headers=new HttpHeaders();
    return this.http.post("http://localhost:8000/api/category/",data, {
      headers: headers
    });
  }
}
