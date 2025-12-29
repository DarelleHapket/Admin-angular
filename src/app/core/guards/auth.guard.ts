// Injectable permet à Angular d’injecter ce guard dans le routing
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  // Le guard est disponible dans toute l’application
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  // On injecte le Router pour pouvoir rediriger
  constructor(private router: Router) {}

  // à chaque tentative d’accès à une route protégée
  canActivate(): boolean {

    // On lit l’état de connexion depuis le localStorage
    // Si isLoggedIn === 'true' → utilisateur connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return true;
    }

    //  utilisateur NON connecté
    //  redirection vers la page de login
    this.router.navigate(['/login']);

    // Refuse l’accès à la route
    return false;
  }
}
