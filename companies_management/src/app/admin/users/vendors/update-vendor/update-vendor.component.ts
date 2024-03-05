import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Neighborhood } from 'src/app/admin/services/neighborhood/Neighborhood';
import { NeighborhoodVendorService } from 'src/app/admin/services/neighborhood/vendor/neighborhood-vendor.service'; 
import { VendorService } from 'src/app/admin/services/vendor/vendor.service';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit{
  updateForm: FormGroup;
  neighborhoods:any=[];
  getId:any;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private ngZone:NgZone,
    private vendorService: VendorService,
    private neighborhood: NeighborhoodVendorService
  ){
    this.getId=this.activateRoute.snapshot.paramMap.get('id');
    this.vendorService.getVendor(this.getId).subscribe(res=>{
      console.log(res);
      this.updateForm.setValue({
        first_name: res[0]['first_name'],
        last_name: res[0]['last_name'],
        phone: res[0]['phone'],
        email: res[0]['email'],
        gender: res[0]['gender'],
        id_neighborhood: res[0]['name']
      });

    });

    this.updateForm=this.formBuilder.group({
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

  onUpdate(): void {
    this.vendorService.updateVendor(this.updateForm.value,this.getId)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/vendors'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
