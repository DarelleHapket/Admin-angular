import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [AuthGuard], // ✅ CORRECTION CLÉ
    children: [
      {
        path: 'commandes',
        loadChildren: () =>
          import('./commandes/commandes.module')
            .then(m => m.CommandesModule)
      },
      {
        path: 'livraisons',
        loadChildren: () =>
          import('./livraisons/livraisons.module')
            .then(m => m.LivraisonsModule)
      },
      {
        path: 'livreurs',
        loadChildren: () =>
          import('./livreurs/livreurs.module')
            .then(m => m.LivreursModule)
      },
      {
        path: 'assignment',
        loadChildren: () =>
          import('./assignment/assignment.module')
            .then(m => m.AssignmentModule)
      },
      {
        path: '',
        redirectTo: 'commandes',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
