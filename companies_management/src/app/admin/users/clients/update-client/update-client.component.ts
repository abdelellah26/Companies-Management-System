import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/admin/services/client/client.service';
import { Neighborhood } from 'src/app/admin/services/neighborhood/Neighborhood';
import { NeighborhoodService } from 'src/app/admin/services/neighborhood/neighborhood.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  updateForm: FormGroup;
  neighborhoods:any=[];
  getId:any;
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private ngZone:NgZone,
    private clientService: ClientService,
    private neighborhood: NeighborhoodService
  ){
    this.getId=this.activateRoute.snapshot.paramMap.get('id');
    this.clientService.getClient(this.getId).subscribe(res=>{
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
    this.clientService.updateClient(this.updateForm.value,this.getId)
      .subscribe(
        () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Clients'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

}
