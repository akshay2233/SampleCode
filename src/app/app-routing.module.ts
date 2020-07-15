import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './Modules/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'taskmanagment',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () => import('../../src/app/Pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('../../src/app/Pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'taskmanagment',
    loadChildren: () => import('../../src/app/Pages/taskmanagement/taskmanagement.module').then((m) => m.TaskmanagementModule),
    canActivate: [AuthGuardService] 
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' } 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
