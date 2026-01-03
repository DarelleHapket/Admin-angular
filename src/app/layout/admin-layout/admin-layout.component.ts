import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, 
    AdminNavbarComponent,
     RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
