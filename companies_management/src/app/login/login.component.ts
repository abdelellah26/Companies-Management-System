
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
     onSubmit(){
      this.authService.login(this.form)
      .subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );

     }

     private handleResponse(data: any) {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/Dashboard']);
    }
    private handleError(error: any) {
      // Traitement des erreurs
      console.error('Une erreur s\'est produite : ', error);
    }
}
