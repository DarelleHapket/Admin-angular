
// l'utilisateur s'authentifie avec email + mot de passe et angular envoie au backend laravel , laravel envoie un token et angular le garde pour les prochaines requetes
// Ce fichier va juste : le service communique avec le backend

// envoyer email + mot de passe au backend

// recevoir le token

// le garder

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://tp4buymore-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // LOGIN SIMPLE → email + password
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Envoi des credentials au backend Laravel:', credentials);

    return this.http.post<any>(
      `${this.baseUrl}/api/admin/login`,
      credentials
    );
  }

  //  SAUVEGARDE DU TOKEN
  // Sauvegarde les infos d'authentification après un login réussi
  saveAuthData(response: any) {

    // 1) Vérifie que la réponse contient bien un token
    //    Ton backend renvoie le token ici : response.data.token
    const token = response?.data?.token;

    // 2) Vérifie que la réponse contient aussi l'admin
    const admin = response?.data?.admin;

    // 3) Si le token existe, on le stocke dans localStorage
    //    localStorage permet de garder le token même si on rafraîchit la page
    if (token) {
      localStorage.setItem('token', token);

      // 4) (Optionnel) On stocke les infos de l'admin connecté
      //    Utile pour afficher le nom, email, etc.
      if (admin) {
        localStorage.setItem('admin', JSON.stringify(admin));
      }

      console.log('Token sauvegardé avec succès !');
    } else {
      // Si on n'a pas de token, on log l'erreur pour debugging
      console.error('Aucun token trouvé dans la réponse:', response);
    }
  }
}
