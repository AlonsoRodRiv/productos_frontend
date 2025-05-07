import { Routes } from '@angular/router';
import { ProductsViewComponent } from './views/products-view/products-view.component';
import { SuppliersViewComponent } from './views/suppliers-view/suppliers-view.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsViewComponent,
  },
  {
    path: 'proveedores',
    component: SuppliersViewComponent,
  },
];
