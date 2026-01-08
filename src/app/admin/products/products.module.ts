import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Pour [(ngModel)] 
import { ProductListComponent } from '../../components/products-list/products-list.component';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,   // Pour *ngFor, *ngIf, pipe date, etc.
    FormsModule    , // Pour [(ngModel)]  
  ],
  exports: [
    ProductListComponent   // Pour que le routing puisse l'utiliser
  ]
})
export class ProductModule { }