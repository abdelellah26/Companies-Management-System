import { Component , NgZone, OnInit } from '@angular/core';
import { Vendor } from 'src/app/admin/services/vendor/Vendor';
import { VendorService } from 'src/app/admin/services/vendor/vendor.service';

@Component({
  selector: 'app-all-vendors',
  templateUrl: './all-vendors.component.html',
  styleUrls: ['./all-vendors.component.css']
})
export class AllVendorsComponent implements OnInit{
  vendors:any=[];
  isDropdownOpenMap: { [vendorId: number]: boolean } = {};
  constructor(private vendorService:VendorService, private zone: NgZone){}

  dtOptions:any = {};
  ngOnInit(): void {

    this.zone.run(() => {
      this.vendorService.getVendors().subscribe(
        res => {
          // Vérifiez si la propriété 'data' existe dans la réponse et est un tableau
          if (res && 'data' in res && Array.isArray(res.data)) {
            this.vendors = res.data as Vendor[];
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



  toggleDropdown(vendorId: number) {
    // Toggle the dropdown state for the specific client
    this.isDropdownOpenMap[vendorId] = !this.isDropdownOpenMap[vendorId];
  }

  delete(id: any, i: any) {
    console.log(id);
    this.vendorService.deleteVendor(id).subscribe(res => {
      this.vendors.splice(i, 1);
      delete this.isDropdownOpenMap[id];
    });
  }
}
