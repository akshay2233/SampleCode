import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/Modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
    path: '',
    component: LoginComponent,
  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule


  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
