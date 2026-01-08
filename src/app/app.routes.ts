import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

// Composants qui existent vraiment chez toi

// Commandes → commandes-list (ou detail, ajuste si besoin)
import { CommandesListComponent } from './admin/commandes/pages/commandes-list/commandes-list.component'; // ajuste le chemin si différent
import { ReportsComponent } from './reports/reports.component';
import { CourierListComponent } from './admin/livreurs/Livreurs/pages/courier-list/courier-list.component';
import { DeliveryListComponent } from './admin/livraisons/Livraisons/pages/delivery-list/delivery-list.component';
import { CourierFormComponent } from './admin/livreurs/Livreurs/pages/courier-form/courier-form.component';
import { AssignmentBoardComponent } from './admin/assignment/pages/assignment/assignment-board.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // 🔥 ON NE MET PLUS DE COMPOSANTS ICI 🔥
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products-list/products-list.component') // ← chemin vers ta liste
            .then(c => c.ProductListComponent)
      },
      {
        path: 'products/add',
        loadComponent: () =>
          import('./components/products-add/create-product.component')
            .then(c => c.CreateProductComponent)
      },
      // {
      //   path: 'products/:id',
      //   loadComponent: () =>
      //     import('./admin/products/pages/product-detail/product-detail.component')
      //       .then(c => c.ProductDetailComponent)
      // },
      // {
      //   path: 'products/:id/edit',
      //   loadComponent: () =>
      //     import('./admin/products/pages/product-edit/product-edit.component')
      //       .then(c => c.ProductEditComponent)
      // },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/commandes/commandes.module')
            .then(m => m.CommandesModule)
      },
      {
        path: 'deliveries',
        loadChildren: () =>
          import('./admin/livraisons/livraisons.module')
            .then(m => m.LivraisonsModule)
      },

      {
    path: 'couriers',
    loadChildren: () =>
      import('./admin/livreurs/livreurs.module')
        .then(m => m.LivreursModule)
    },
    {
      path: 'assignment',
      loadComponent: () =>
        import('./admin/assignment/pages/assignment/assignment-board.component')
          .then(c => c.AssignmentBoardComponent)
    }     
       

    ]
  },

  { path: '**', redirectTo: 'login' }
];





// export const routes: Routes = [
// //  ceci c'est la route par defaut si on a rien ca redirige vers login 
//     {
//         path: '',
//         redirectTo: 'login',
//         pathMatch: 'full'
//     },

//   { path: 'login', component: LoginComponent },

//     // Groupe de routes ADMIN protégées
//   {
//     path: 'admin',    
//     component: AdminLayoutComponent,

//     // canActivate : Angular appelle AuthGuard
//     // AVANT d’autoriser l’accès à /admin/*
//     canActivate: [AuthGuard],
    
//     //les routes enfants de admin
//     children: [
//       { 
//         path: 'dashboard', component: DashboardComponent 
//       },
      
//       { path: 'reports', component: ReportsComponent },

//       // Route par défaut dans /admin
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

//       // Routes corrigées avec les vrais composants
//       { path: 'orders', component: CommandesListComponent },           // Commandes
//       { path: 'deliveries', component: DeliveryListComponent },         // Livraisons
//       { path: 'couriers', component: CourierListComponent },            // Liste des livreurs
//       { path: 'courier-form', component: CourierFormComponent },        // Formulaire livreur (si tu veux une page dédiée)
//       { path: 'assignment', component: AssigmentBoardComponent },

//     ]
//   },

//      // Route inconnue → retour au login
//   { 
//     path: '**', 
//     redirectTo: 'login' 
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }