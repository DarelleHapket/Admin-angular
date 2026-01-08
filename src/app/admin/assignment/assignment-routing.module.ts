import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentBoardComponent } from './pages/assignment/assignment-board.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule {}
