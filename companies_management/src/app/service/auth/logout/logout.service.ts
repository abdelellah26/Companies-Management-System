import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) {}

  logout(): void {
    // Clear authentication token, reset user-related data, etc.
    localStorage.removeItem('token'); // Assuming you store the token in localStorage
    // Navigate to the login page
    this.router.navigate(['/']);
  }
}
