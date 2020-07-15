import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL: any = 'https://task-management-rest-app.herokuapp.com/';

  constructor(private http: HttpClient, private snackBar: MatsnackbarService
  ) { }

  fnLogin(loginparams) {
    return new Promise((resolve, reject) => {
      this.http.post(this.BASE_URL + 'api/users/login', loginparams)
        .subscribe((response: any) => {
          if (response.data) {
            this.snackBar.openSnackBar('SignIn complted successfully', 'Success');
          } else {
            this.snackBar.openSnackBar('Error while login', 'Error');
          }
          resolve(response);
        }, err => {          
          resolve(false);
          if (err && err.error) {
            this.snackBar.openSnackBar(err.error.errors || 'Error while login','Error')
          }
          throw err;
        });
    });
  }

}
