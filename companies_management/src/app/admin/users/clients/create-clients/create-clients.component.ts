import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/admin/services/client/client.service';
import { Neighborhood } from 'src/app/admin/services/neighborhood/Neighborhood';
import { NeighborhoodService } from 'src/app/admin/services/neighborhood/neighborhood.service';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.css']
})
export class CreateClientsComponent implements OnInit {
  clientForm: FormGroup;
  neighborhoods:any=[];
  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private clientService: ClientService,
    private neighborhood: NeighborhoodService
  ){
    this.clientForm= this.formBuilder.group({
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
    this.clientService.addClient(this.clientForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/Clients'));
        },
        (error) => {
          console.error('Error:', error);
        }
      );


  }
}
