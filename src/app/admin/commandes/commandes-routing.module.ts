import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesListComponent } from './pages/commandes-list/commandes-list.component';

const routes: Routes = [
  {
    path: '',
    component: CommandesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule {}
