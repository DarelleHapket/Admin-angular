import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // function login
  login() {
    console.log('Login cliqué', this.email, this.password);

    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Simulation de login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', this.email);

    console.log('LocalStorage OK');
    this.router.navigate(['/admin/dashboard']);// redirection vers le dashboard admin
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
