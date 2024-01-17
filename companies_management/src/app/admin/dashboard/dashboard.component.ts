import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Récupérer les données du backend après la connexion
    this.fetchDashboardData();
  }

  private fetchDashboardData() {
    // Utilisez le token d'authentification stocké dans localStorage pour l'authentification
    const token = localStorage.getItem('token');

    // Exemple de requête pour récupérer les données du backend (ajustez l'URL selon votre backend)
    this.http.get('http://localhost:8000/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
