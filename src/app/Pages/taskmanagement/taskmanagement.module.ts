import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskmanagementComponent } from './taskmanagement.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/Modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskdilogComponent } from './taskdilog/taskdilog.component';
import { TaskmanagementService } from './taskmanagement.service';
import { AuthintercepterService } from 'src/app/Modules/authintercepter.service';

const routes = [
  {
    path: '',
    component: TaskmanagementComponent,
  }
];

@NgModule({
  declarations: [TaskmanagementComponent, TaskdilogComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule
  ],
  entryComponents: [TaskdilogComponent],
//  providers:[TaskmanagementService],
  providers: [
    TaskmanagementService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthintercepterService, multi: true },
  ],
})
export class TaskmanagementModule { }
