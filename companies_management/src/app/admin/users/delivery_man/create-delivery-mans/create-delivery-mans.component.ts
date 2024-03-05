import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryManService } from 'src/app/admin/services/deliveryMans/delivery-man.service';
import { NeighborhoodDeliveryManService } from 'src/app/admin/services/neighborhood/deliveryMan/neighborhood-delivery-man.service';
import { Neighborhood } from 'src/app/admin/services/neighborhood/Neighborhood';

@Component({
  selector: 'app-create-delivery-mans',
  templateUrl: './create-delivery-mans.component.html',
  styleUrls: ['./create-delivery-mans.component.css']
})
export class CreateDeliveryMansComponent {

  deliveryManForm: FormGroup;
  neighborhoods:any=[];
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private deliveryManService: DeliveryManService,
    private neighborhood: NeighborhoodDeliveryManService
  ){
    this.deliveryManForm= this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
      email: [''],
      gender: [''],
      id_neighborhood: [''],

    })
  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.neighborhood.getNeiborhoods().subscribe(
        res => {
          // Vérifiez si la propriété 'data' existe dans la réponse et est un tableau
          if (res && 'data' in res && Array.isArray(res.data)) {
            this.neighborhoods = res.data as Neighborhood[];
          } else {
            console.error('The "data" property in the API response is invalid.');
          }
        },
        error => {
          console.error('Erreur API :', error);
        }
      );
    });
  }

  onSubmit(): void {
    this.deliveryManService.addDeliveryMan(this.deliveryManForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Delivery-Mans'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );


  }
}

