import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagementService {

  BASE_URL: any = 'https://task-management-rest-app.herokuapp.com/';

  constructor(private http: HttpClient, private snackBar: MatsnackbarService) { }

  fnAddTask(taskparams) {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + 'api/tasks', taskparams)
        .subscribe((response: any) => {
          if (response.data) {
            this.snackBar.openSnackBar('Task added successfully', 'Success');
          } else {
            this.snackBar.openSnackBar('Error while adding task', 'Error');
          }
          resolve(response);
        }, err => {
          resolve(false);
          if (err && err.error) {
            this.snackBar.openSnackBar(err.error.errors || 'Error adding task', 'Error')
          }
          throw err;
        });
    });
  }


  fnEditTask(taskparams, id) {
    return new Promise((resolve, reject) => {
      this.http.put(this.BASE_URL + 'api/tasks/' + id, taskparams)
        .subscribe((response: any) => {
          if (response.data) {
            this.snackBar.openSnackBar('Task Edited successfully', 'Success');
          } else {
            this.snackBar.openSnackBar('Error while Edited task', 'Error');
          }
          resolve(response);
        }, err => {
          resolve(false);
          if (err && err.error) {
            this.snackBar.openSnackBar(err.error.errors || 'Error Edited task', 'Error')
          }
          throw err;
        });
    });
  }

  fnGetAllTask() {
    return new Promise((resolve, reject) => {
      this.http.get(this.BASE_URL + 'api/tasks')
        .subscribe((response: any) => {
          if (response.data) {
            resolve(response);
          } else {
            resolve(false);
            this.snackBar.openSnackBar('Error while fetching tasks', 'Error');
          }
        }, err => {
          resolve(false);
          if (err && err.error) {
            this.snackBar.openSnackBar(err.error.errors || 'Error fetching tasks', 'Error')
          }
          throw err;
        });
    });
  }

  fnDeleteTask(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.BASE_URL + 'api/tasks/' + id)
        .subscribe((response: any) => {
          if (response) {
            resolve(response);
          } else {
            resolve(false);
            this.snackBar.openSnackBar('Error while deleting tasks', 'Error');
          }
        }, err => {
          resolve(false);
          if (err && err.error) {
            this.snackBar.openSnackBar(err.error.errors || 'Error deleting tasks', 'Error')
          }
          throw err;
        });
    });
  }
}
