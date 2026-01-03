import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LivreursRoutingModule } from './Livreurs/pages/livreurs-routing.module';
import { CourierListComponent } from './Livreurs/pages/courier-list/courier-list.component';
import { CourierFormComponent } from './Livreurs/pages/courier-form/courier-form.component';


@NgModule({
  declarations: [
    CourierListComponent,
    CourierFormComponent
  ],
  imports: [
    CommonModule,      // *ngFor, *ngIf, pipes
    FormsModule,       //  OBLIGATOIRE pour [(ngModel)]
    RouterModule,      // Pour routerLink
    LivreursRoutingModule
  ]
})
export class LivreursModule {}