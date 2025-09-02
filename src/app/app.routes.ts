import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/withdrawal-page/withdrawal-page').then(m => m.WithdrawalPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
