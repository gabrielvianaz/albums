import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private baseURL = 'https://dummyjson.com/auth';

  authenticate(authRequest: AuthRequest) {
    return this.httpClient
      .post<AuthResponse>(this.baseURL + '/login', {
        username: authRequest.username,
        password: authRequest.password,
      })
      .pipe(
        tap((res) => localStorage.setItem('token', res.token)),
        catchError((error) => {
          return throwError(() => new Error('Ocorreu um erro na autenticação'));
        })
      );
  }

  validateToken() {
    return this.httpClient
      .get(this.baseURL + '/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((res) => {
          catchError((error) => {
            return throwError(() => new Error('Token inválido'));
          });
        })
      );
  }
}
