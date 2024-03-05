import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000'; // Mettez l'URL de votre backend Laravel ici
  public isAdmin = false;
  private token: string = '';
  constructor(private http: HttpClient,private router: Router) { }


  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/api/login`, credentials)
      .pipe(
        tap((data: any) => {
          console.log('isAdmin from backend:', data.isAdmin);
          this.token = data.token;
          localStorage.setItem('token', data.token);
          this.isAdmin = data.isAdmin; // Assurez-vous que votre backend renvoie une propriété indiquant si l'utilisateur est un admin
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.token = '';
    this.isAdmin = false;
    this.router.navigate(['/']); // Rediriger vers la page de connexion après la déconnexion
  }

  getToken(): string {
    return this.token;
  }
}
