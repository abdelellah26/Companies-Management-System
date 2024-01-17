import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-delivery-mans',
  templateUrl: './create-delivery-mans.component.html',
  styleUrls: ['./create-delivery-mans.component.css']
})
export class CreateDeliveryMansComponent {

  first_name: string="";
  last_name: string="";
  email: string="";
  phone: number=0;
  password: string="";
  gender: string="";

  constructor(private http: HttpClient ) { }

  register(){
    let bodyData={
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      gender: this.gender,
    }
    this.http.post("http://localhost:8000/api/deliveryMan", bodyData, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Delivery Man Registered Successfully");
      },
      (error) => {
        console.error('Error registering delivery man:', error);
        alert("Failed to register delivery man");
      }
    );
  }

  save()
  {

        this.register();


  }
}

