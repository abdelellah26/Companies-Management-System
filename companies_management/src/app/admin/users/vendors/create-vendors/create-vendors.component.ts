import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.css']
})
export class CreateVendorsComponent {
 
  public form = {
    firstname: null,
    lastname: null,
    phone: null,
    gender: null,
    email: null,
    password: null,
    password_confirmation: null,
  }


}
