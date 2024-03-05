
import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form = {
    email: null,
    password: null
  }
  public error =null;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.login(this.form)
      .subscribe(
        (data: any) => {
          // Lorsque la connexion réussit, le service devrait mettre à jour la propriété isAdmin
          if (this.authService.isAdmin) {
            this.router.navigate(['/Dashboard']);
          } else {
            // Rediriger vers une page différente pour les non-administrateurs si nécessaire
            this.router.navigate(['/']);
          }
        },
        error => this.handleError(error)
      );
  }



     private handleError(error: any) {
      console.error('Une erreur s\'est produite : ', error);
      if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        console.error('Erreur côté client :', error.error.message);
      } else {
        // Erreur côté serveur
        console.error('Code d\'erreur :', error.status);
        console.error('Réponse du serveur :', error.error);
      }
    }
}
