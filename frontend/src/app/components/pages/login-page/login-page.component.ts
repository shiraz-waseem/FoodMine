import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false; // User presented submitted button or not we want to show validations when user submit button

  returnUrl = '';

  // we can create a new login form by creating a new instance of FormGroup but too much code so we can use FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // Here we need to define all the inputs and their validators
      // first parameter is initial value default value and 2nd is validators. For multiple validators put in array and write as many you want
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      // remember inside typescript we dont call it email form input we call it email form control
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  // if you want to have access to email you have to write loginForm.controls.email
  // so lets make loginForm.controls as a getProperty

  get fc() {
    return this.loginForm.controls; // fc.email much similar now
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    alert(`email: ${this.fc['email'].value},
     password: ${this.fc['password'].value}`);

    this.userService
      .login({
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });

    // After finishing the login process we want to return the user where he was it create returnURL = ''.
    // We need to return the user too need to injected router too.
  }
}
