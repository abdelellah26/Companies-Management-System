import { Component , OnInit} from '@angular/core';
import { GetDeliveryManService } from 'src/app/admin/services/deliveryMans/getDeliveryMans/get-delivery-man.service';
@Component({
  selector: 'app-all-delivery-mans',
  templateUrl: './all-delivery-mans.component.html',
  styleUrls: ['./all-delivery-mans.component.css']
})
export class AllDeliveryMansComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  deliveryMans: any[] = [];

  constructor(private deliveryMansService: GetDeliveryManService) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers', // or other options as needed
      pageLength: 10, // number of rows per page
      searching: true
    };
    this.loadDeliveryMans();
  }

  isDropdownOpen: boolean = false;

  loadDeliveryMans() {
    this.deliveryMansService.getAllDeliveryMans().subscribe(
      (data:any) => {
        this.deliveryMans = data.data;
      },
      (error:any) => {
        console.error('Error fetching delivery mans:', error);
      }
    );
  }

  toggleDropdown(deliveryMan: any) {
    deliveryMan.isDropdownOpen = !deliveryMan.isDropdownOpen;
  }
}
