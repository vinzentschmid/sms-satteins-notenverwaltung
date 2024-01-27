import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/service.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    twoFactorCode: '',
    twoFactorRecoveryCode: '',
  };

  // Continued from your component .ts file
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle error response
      },
    });
  }
}
