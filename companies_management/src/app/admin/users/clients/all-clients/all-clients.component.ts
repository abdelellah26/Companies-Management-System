import {Component , NgZone, OnInit} from '@angular/core';
import { Client } from 'src/app/admin/services/client/Client';
import { ClientService } from 'src/app/admin/services/client/client.service';
declare var $: any;
@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css'],

})
export class AllClientsComponent implements OnInit{
  clients:any=[];
  isDropdownOpenMap: { [clientId: number]: boolean } = {};
  constructor(private clientService: ClientService, private zone: NgZone){}

  dtOptions:any = {};
  ngOnInit(): void {

    this.zone.run(() => {
      this.clientService.getClients().subscribe(
        res => {
          // Vérifiez si la propriété 'data' existe dans la réponse et est un tableau
          if (res && 'data' in res && Array.isArray(res.data)) {
            this.clients = res.data as Client[];
            console.log(res.data );
          } else {
            console.error('The "data" property in the API response is invalid.');
          }
        },
        error => {
          console.error('Erreur API :', error);
        }
      );
    });

    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10
    };
  }



  toggleDropdown(clientId: number) {
    // Toggle the dropdown state for the specific client
    this.isDropdownOpenMap[clientId] = !this.isDropdownOpenMap[clientId];
  }

  delete(id: any, i: any) {
    console.log(id);
    this.clientService.deleteClient(id).subscribe(res => {
      this.clients.splice(i, 1);
      delete this.isDropdownOpenMap[id];
    });
  }
}
