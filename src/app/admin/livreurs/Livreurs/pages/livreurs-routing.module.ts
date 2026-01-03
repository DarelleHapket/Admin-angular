import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierListComponent } from './courier-list/courier-list.component';
import { CourierFormComponent } from './courier-form/courier-form.component';

const routes: Routes = [
  {
    path: '',
    component: CourierListComponent
    // /admin/couriers
  },
  {
    path: 'new',
    component: CourierFormComponent
    // /admin/couriers/new
  },
  {
    path: 'edit/:id',
    component: CourierFormComponent
    // /admin/couriers/edit/1
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreursRoutingModule {}
