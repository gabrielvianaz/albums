import { Component } from '@angular/core';
import { AuthRequest } from '../../models/auth-request.model';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  authRequest: AuthRequest = { username: '', password: '' };
  loading = false;
  showError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.showError = false;
    this.loading = true;
    this.authService
      .authenticate(this.authRequest)
      .pipe(
        catchError((error) => {
          this.showError = true;
          return [];
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }

  isButtonDisabled() {
    return (
      this.loading || !this.authRequest.username || !this.authRequest.password
    );
  }
}
