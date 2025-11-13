import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component'; // 路徑請依你實際位置調整
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'], // 如有自訂樣式可加，無則可省略
})
export class AppShellComponent {
  // 通常這裡不用寫邏輯，除非全域通知、管理登入狀態等進階功能
}
