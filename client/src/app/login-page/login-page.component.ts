import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
      } else if (params['accessDenied']) {
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
        this.router.navigate(['/overview']);
        console.log('Success', data);
      },
      (error) => {
        console.warn(error);
        this.form.enable();
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
