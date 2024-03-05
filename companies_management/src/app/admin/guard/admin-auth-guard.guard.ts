// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirige vers la page de connexion si l'admin n'est pas connecté.
      return false;
    }
  }
}
