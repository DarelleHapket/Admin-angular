import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        // ✅ Sauvegarde du VRAI token JWT
        this.authService.saveAuthData(response);

        // 🔐 Vérification stricte
        const token = localStorage.getItem('token');
        if (token) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Identifiants incorrects';
        }

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
