import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ← À AJOUTER

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssigmentBoardComponent } from './pages/assigment/assigment-board.component';

@NgModule({
  declarations: [
    AssigmentBoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,               // ← AJOUTE ÇA ICI !
    AssignmentRoutingModule
    // autres modules...
  ]
})
export class AssignmentModule { }
