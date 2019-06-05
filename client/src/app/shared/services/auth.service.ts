import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private token: string = null;
  private user: Object = null;

  login(user: User): Observable<{ token: string; user: {} }> {
    return this.httpClient.post<{ token: string; user: {} }>('/api/v1/auth/login', user).pipe(
      tap(({ token, user }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
        this.setUser(user);
      })
    );
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/v1/auth/register', user).pipe(
      tap((user) => {
        this.setUser(user);
        debugger;
      })
    );
  }

  setToken(token) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getUser(): Object {
    return this.user;
  }

  isAuthenticated(): Boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    this.setUser(null);
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  setUser(user) {
    this.user = user;
  }
}
