import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //Ak:to set login form values
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private serv: SignupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ],],

    });
    this.signupForm.reset()
  }

  onSubmit() {
    
    if (this.signupForm.value && this.signupForm.valid) {
      this.serv.fnSignUp(this.signupForm.value).then((res: any) => {
        if (res && res.data) {
          this.fnNavigateTOLogin()
        }
      })
    }
  }
  fnNavigateTOLogin() {
    this.router.navigate(['/login'])
  }

}
