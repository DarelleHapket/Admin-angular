import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentBoardComponent } from './pages/assignment/assignment-board.component';

@NgModule({
  declarations: [
    AssignmentBoardComponent
  ],
  imports: [
    CommonModule,   // ngIf, ngFor
    FormsModule,    // ✅ ngModel (OBLIGATOIRE)
    AssignmentRoutingModule
  ]
})
export class AssignmentModule {}
