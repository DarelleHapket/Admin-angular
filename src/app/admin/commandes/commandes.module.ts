import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Pour [(ngModel)]

// Import du composant (chemin relatif depuis admin/commandes/)
import { CommandesListComponent } from './pages/commandes-list/commandes-list.component';
import { CommandesRoutingModule } from './commandes-routing.module';

@NgModule({
  declarations: [
    CommandesListComponent
  ],
  imports: [
    CommonModule,   // Pour *ngFor, *ngIf, pipe date, etc.
    FormsModule    , // Pour [(ngModel)]
    CommandesRoutingModule

  ],
  exports: [
    CommandesListComponent   // Pour que le routing puisse l'utiliser
  ]
})
export class CommandesModule { }