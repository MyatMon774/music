import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
  
    {
      path: 'home',
      loadComponent: () =>
        import('./pages/home/home.component').then(
          (c) => c.HomeComponent
        ),
    },
   
    {
      path: 'player',
      loadComponent: () =>
        import('./pages/player/player.component').then(
          (c) => c.PlayerComponent
        ),
    }
];
