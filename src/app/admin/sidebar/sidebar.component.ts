import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // État de la sidebar (ouverte ou fermée)
  isCollapsed: boolean = false;

  // Méthode appelée quand on clique sur le bouton
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

//  fnction de deconnexion 
  logout(){
    // supprime l'etat de connexion et renvoie vers le login
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';

  }
}