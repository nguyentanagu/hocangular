import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  isLoggedIn = false;
  users: any[] = []; 
  constructor(private fb: FormBuilder, private router: Router) {
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
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  // Xử lý đăng ký
  handleRegister() {
    if (this.registerForm.invalid) return;

    const { username, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    // Kiểm tra email đã tồn tại chưa
    if (this.users.some(user => user.email === email)) {
      alert('Email này đã được sử dụng!');
      return;
    }

    // Lưu tài khoản vào danh sách người dùng
    this.users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(this.users));

    alert('Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');

    // Reset form và chuyển sang đăng nhập
    this.registerForm.reset();
    this.isLoginMode = true;
  }

  // Xử lý đăng nhập
  handleLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const user = this.users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Đăng nhập thành công! Chào mừng ${user.username}`);
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      //Chuyển hướng về trang Home sau khi đăng nhập thành công
      this.router.navigate(['/home']);
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  }
  
}
