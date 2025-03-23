import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'detail/:id',  component:DetailComponent},
    // { path: 'create',  component: CreateComponent},
    {
        path: 'detail/:id',
        loadComponent: () =>
          import('./detail/detail.component').then((m) => m.DetailComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create/create.component').then((m) => m.CreateComponent),
      },
      { path: 'login',  component: LoginComponent},
      { path: 'home', component: HomeComponent }, 
     

];
