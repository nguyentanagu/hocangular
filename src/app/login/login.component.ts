import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  isLoggedIn = false;
  users: any[] = [];

  // RxJS Subjects
  private submitTrigger$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private modeSubject$ = new BehaviorSubject<boolean>(true); // Quản lý chế độ login/register

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Tải danh sách người dùng từ localStorage
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];

    // Form đăng nhập
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Form đăng ký
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    // Xử lý submit với RxJS
    this.submitTrigger$
      .pipe(
        switchMap(() => this.modeSubject$.pipe(
          tap(mode => {
            if (mode) {
              this.handleLogin();
            } else {
              this.handleRegister();
            }
          })
        )),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.modeSubject$.next(this.isLoginMode); // Cập nhật trạng thái chế độ
  }

  onSubmit() {
    this.submitTrigger$.next(); // Kích hoạt submit thông qua Subject
  }

  // Xử lý đăng ký
  private handleRegister() {
    if (this.registerForm.invalid) return;

    const { username, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    if (this.users.some(user => user.email === email)) {
      alert('Email này đã được sử dụng!');
      return;
    }

    this.users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(this.users));

    alert('Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');
    this.registerForm.reset();
    this.toggleMode(); // Chuyển sang chế độ đăng nhập
  }

  // Xử lý đăng nhập
  private handleLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const user = this.users.find(user => user.email === email && user.password === password);

    if (user) {
      this.authService.login(user); // Lưu trạng thái đăng nhập
      this.router.navigate(['/home']);
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(); // Hủy tất cả subscription khi component bị hủy
    this.destroy$.complete();
  }
}