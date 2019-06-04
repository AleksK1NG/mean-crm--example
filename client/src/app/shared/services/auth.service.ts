import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>('/api/v1/auth/login', user);
  }

  register() {}
}

