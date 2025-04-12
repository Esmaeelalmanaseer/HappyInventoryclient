import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true; // For password visibility
  isLoading = false; // For loading state

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieservice:CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.cookieservice.set(
            'Authorization',
            'Bearer ' + res.toekn,
            undefined,
            '/',
            undefined,
            true,
            'Strict'
          );
          console.log(res)
           //set User
    this.authService.setUser({
      email:res.email,
      roles:res.roles
    });
    const roles = res.roles;
    if (roles.includes('Admin')) {
      this.router.navigate(['/dashboard']);
    } else if (roles.includes('Management')) {
      this.router.navigate(['/warehouse']);
    } else {
      this.router.navigate(['/']);
    }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login error:', err);
          alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      });
    }
  }
}