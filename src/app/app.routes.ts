import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path : 'login', loadComponent: () => 
      import('./component/login/login.component').then(
        (c) => c.LoginComponent
      )
    },
    {
      path: 'home',
      loadComponent: () =>
        import('./pages/home/home.component').then(
          (c) => c.HomeComponent
        ),
    },
    {
      path: 'callback',
      loadComponent: () =>
        import('./component/callback/callback.component').then(
          (c) => c.CallbackComponent
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
