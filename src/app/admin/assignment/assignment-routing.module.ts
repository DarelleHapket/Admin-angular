import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importe ton vrai composant
import { AssigmentBoardComponent } from './pages/assigment/assigment-board.component';
// ou './assigment-board/assigment-board.component' selon le chemin

const routes: Routes = [
  { path: '', component: AssigmentBoardComponent }  // /admin/assignment → ta page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }