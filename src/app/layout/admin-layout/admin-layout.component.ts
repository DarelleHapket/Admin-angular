import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    AdminNavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  isSidebarCollapsed = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.collapsed$.subscribe(collapsed => {
      this.isSidebarCollapsed = collapsed;
    });
  }
}
