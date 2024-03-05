import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Neighborhood } from 'src/app/admin/services/neighborhood/Neighborhood';
import { NeighborhoodVendorService } from 'src/app/admin/services/neighborhood/vendor/neighborhood-vendor.service';
import { VendorService } from 'src/app/admin/services/vendor/vendor.service';

@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.css']
})
export class CreateVendorsComponent implements OnInit {

  vendorForm: FormGroup;
  neighborhoods:any=[];
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private vendorService: VendorService,
    private neighborhood: NeighborhoodVendorService
  ){
    this.vendorForm= this.formBuilder.group({
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
    this.vendorService.addVendor(this.vendorForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/vendors'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );


  }


}
