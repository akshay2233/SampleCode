import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatsnackbarService } from './matsnackbar.service';

@Injectable({
  providedIn: 'root',
  
})
export class AuthGuardService implements CanActivate {

  constructor(private matsnackbar: MatsnackbarService, private router: Router) { }

  canActivate(): boolean {
    var userData: any = this.matsnackbar.fnGetToken();
    if (userData && userData.accessToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
