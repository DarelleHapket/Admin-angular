import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    // composants admin (layout, sidebar, etc.)
  ],
  imports: [
    CommonModule,
    AdminRoutingModule   //
  ]
})
export class AdminModule {}
