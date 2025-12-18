import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(private router: Router) {
    console.log('Dashboard chargé - LocalStorage:', {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      userEmail: localStorage.getItem('userEmail')
    });
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
