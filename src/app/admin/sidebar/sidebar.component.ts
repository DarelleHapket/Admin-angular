import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

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

  constructor(
    private sidebarService: SidebarService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Méthode appelée quand on clique sur le bouton
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarService.setCollapsed(this.isCollapsed);
  }

  //  fnction de deconnexion
  logout(){
    // Vérifier si nous sommes dans un navigateur
    if (isPlatformBrowser(this.platformId)) {
      // supprime l'etat de connexion et renvoie vers le login
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
  }
}