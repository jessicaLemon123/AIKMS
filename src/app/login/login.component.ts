import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ← 這裡很重要！要引入 FormsModule 才能用 [(ngModel)]
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = '';

  constructor(private authService: AuthService) {}
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (result) => {
        alert(result.result);
        if (result && result.result === 'success') {
          alert('登入成功！歡迎 ' + result.user);
          this.loginError = '';
          // this.router.navigate(['/dashboard']);
        } else {
          this.loginError = '帳號或密碼錯誤';
        }
      },
      error: (err) => {
        this.loginError = '帳號或密碼錯誤';
      },
    });
  }
}
