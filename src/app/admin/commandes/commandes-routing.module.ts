import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesListComponent } from './pages/commandes-list/commandes-list.component';
import { CommandesDetailComponent } from './pages/commandes-detail/commandes-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CommandesListComponent
  },
   // Route pour le détail d'une commande (/admin/commandes/1, /admin/commandes/55, etc.)
  { path: ':id', component: CommandesDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule {}
