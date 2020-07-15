import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Modules/material.module';
import { SignupService } from './signup.service';
import { HttpClientModule } from '@angular/common/http';
const routes = [
  {
    path: '',
    component: SignupComponent,
  }
];


@NgModule({
  declarations: [SignupComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SignupService]
})
export class SignupModule { }
