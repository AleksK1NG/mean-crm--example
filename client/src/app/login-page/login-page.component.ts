import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('You can login');
      } else if (params['accessDenied']) {
        MaterialService.toast('Invalid credentials');
      } else if (params['sessionExpired']) {
        MaterialService.toast('Your session is expired');
      }
    });
  }

  onSubmit() {
    this.form.disable();
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.loginSub = this.authService.login(user).subscribe(
      (data) => {
        this.router.navigate(['/']);
        console.log('Success', data);
        MaterialService.toast('Success =D');
      },
      (error) => {
        console.warn(error);
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    );
    console.log('Submit form');
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
