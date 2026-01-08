import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private checkAuth(): boolean {
    // Vérifier si nous sommes dans un navigateur (pas en SSR)
    if (!isPlatformBrowser(this.platformId)) {
      // En SSR, autoriser l'accès temporairement (sera re-vérifié côté client)
      return true;
    }

    const token = localStorage.getItem('token');

    if (token && token.length > 10) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }
}
