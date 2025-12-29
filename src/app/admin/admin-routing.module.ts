import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'commandes',
    loadChildren: () => import('./commandes/commandes.module').then(m => m.CommandesModule)
  },
  // ... autres routes
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
