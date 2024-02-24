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

  loginError = false; // Fehlerzustand hinzugefügt

  // Continued from your component .ts file
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        const token = response.accessToken;

        localStorage.setItem('authToken', token);
        localStorage.setItem('email', this.loginData.email);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loginError = true; // Fehlerzustand setzen, wenn ein Fehler auftritt
      },
    });
  }
}
