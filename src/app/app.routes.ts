import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
//  ceci c'est la route par defaut si on a rien ca redirige vers login 
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

  

  { path: 'login', component: LoginComponent },

    // Groupe de routes ADMIN protégées
  {
    path: 'admin',

    // canActivate : Angular appelle AuthGuard
    // AVANT d’autoriser l’accès à /admin/*
    canActivate: [AuthGuard],
//les routes enfants de admin
    children: [
      { 
        path: 'dashboard', component: DashboardComponent 
      }
    ]
  },

     // Route inconnue → retour au login
  { 
    path: '**', 
    redirectTo: 'login' 
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
