import { Component } from '@angular/core';

@Component({
  selector: 'app-header-pos',
  templateUrl: './header-pos.component.html',
  styleUrls: ['./header-pos.component.css']
})
export class HeaderPosComponent {
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
