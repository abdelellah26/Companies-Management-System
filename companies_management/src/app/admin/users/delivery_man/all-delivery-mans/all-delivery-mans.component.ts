import { Component , NgZone, OnInit} from '@angular/core';
import { DeliveryManService } from 'src/app/admin/services/deliveryMans/delivery-man.service';
import { DeliveryMan } from 'src/app/admin/services/deliveryMans/deliveryMan';
@Component({
  selector: 'app-all-delivery-mans',
  templateUrl: './all-delivery-mans.component.html',
  styleUrls: ['./all-delivery-mans.component.css']
})
export class AllDeliveryMansComponent implements OnInit{
  deliveryMans:any=[];
  isDropdownOpenMap: { [DeliveryManId: number]: boolean } = {};
  constructor(private deliveryManService: DeliveryManService, private zone: NgZone){}

  dtOptions:any = {};
  ngOnInit(): void {

    this.zone.run(() => {
      this.deliveryManService.getDeliveryMans().subscribe(
        res => {
          // Vérifiez si la propriété 'data' existe dans la réponse et est un tableau
          if (res && 'data' in res && Array.isArray(res.data)) {
            this.deliveryMans = res.data as DeliveryMan[];
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



  toggleDropdown(DeliveryManId: number) {
    // Toggle the dropdown state for the specific client
    this.isDropdownOpenMap[DeliveryManId] = !this.isDropdownOpenMap[DeliveryManId];
  }

  delete(id: any, i: any) {
    console.log(id);
    this.deliveryManService.deleteDeliveryMan(id).subscribe(res => {
      this.deliveryMans.splice(i, 1);
      delete this.isDropdownOpenMap[id];
    });
  }



}
