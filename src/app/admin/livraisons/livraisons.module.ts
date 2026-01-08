import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryListComponent } from './Livraisons/pages/delivery-list/delivery-list.component';
import { LivraisonsRoutingModule } from './livraisons-routing.module';


` `
@NgModule({
  declarations: [
    DeliveryListComponent
  ],
  imports: [
    CommonModule, //// *ngFor, *ngIf, pipes (date, etc.)
    FormsModule,         // [(ngModel)] ← C’EST ÇA QUI MANQUAIT
    LivraisonsRoutingModule
  ]
})
export class LivraisonsModule { }
