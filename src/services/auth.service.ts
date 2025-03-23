import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    const user = localStorage.getItem('loggedInUser');
    this.isLoggedInSubject.next(!!user); // Kiểm tra nếu đã đăng nhập
  }

  login(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
