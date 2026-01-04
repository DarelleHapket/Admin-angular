// ce fichier permet d'envoyer le token au backend laravel


// Type d’interceptor fonctionnel (Angular standalone)
import { HttpInterceptorFn } from '@angular/common/http';

// Permet d’injecter un service sans passer par un constructeur
import { inject } from '@angular/core';

// Service d’authentification où se trouve le token
import { AuthService } from '../auth/auth.service';

// Interceptor HTTP : ce code est exécuté AVANT chaque requête HTTP
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // On récupère le AuthService via inject()
  const authService = inject(AuthService);

  // On récupère le token stocké dans le localStorage
  const token = authService.getToken();

  // Si un token existe (utilisateur connecté)
  if (token) {

    // Les requêtes HTTP sont IMMUTABLES
    // On crée donc une copie de la requête originale
    const authReq = req.clone({

      // On ajoute le header Authorization attendu par Laravel
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // On envoie la requête MODIFIÉE au backend
    return next(authReq);
  }

  // Si aucun token (ex: page login), on envoie la requête normale
  return next(req);
};
