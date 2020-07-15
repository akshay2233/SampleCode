import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatsnackbarService } from 'src/app/Modules/matsnackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Ak:to set login form values
  loginForm: any = {};


  constructor(private fb: FormBuilder,
    private router: Router,
    private serv: LoginService,
    private snackBar: MatsnackbarService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ],],

    });
    this.loginForm.reset()
  }

  onSubmit() {
    
    if (this.loginForm.value && this.loginForm.valid) {
      this.serv.fnLogin(this.loginForm.value).then((res: any) => {
        if (res && res.data) {
          this.snackBar.fnSetToken(res.data)
          this.router.navigate(['/taskmanagment'])
        }
      })
    }
  }

  fnNavigateTOSignUp() {
    this.router.navigate(['/signup'])
  }
}
