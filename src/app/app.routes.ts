import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TopicsListComponent } from './pages/topics-list/topics-list.component';
import { TopicAdminComponent } from './pages/topic-admin/topic-admin.component';
import { ArticleEditComponent } from './pages/article-edit/article-edit.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleDetailMenuComponent } from './pages/article-detail-menu/article-detail-menu.component';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { TopicPermissionAdminComponent } from './pages/topic-permission-admin/topic-permission-admin.component';
import { AuthGuard } from './core/auth.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // /login 也能看到登入
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', component: TopicsListComponent }, // 首頁就登入畫面
      { path: 'test', component: ArticleDetailMenuComponent }, // 測試
      { path: 'topic/permission', component: TopicPermissionAdminComponent }, // 測試
      { path: 'admin/topics', component: TopicAdminComponent },
      { path: 'articles', component: ArticleListComponent },
      { path: 'articles/edit', component: ArticleEditComponent }, // 新增
      { path: 'articles/edit/:id', component: ArticleEditComponent }, // 編輯
      { path: 'articles/:id', component: ArticleDetailComponent }, // 新增這一行
      {
        path: 'admin/roles',
        loadChildren: () =>
          import('./roles-permissions/roles-permissions.routes').then(
            (m) => m.ROLES_PERMISSIONS_ROUTES
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: '' },
      { path: '**', redirectTo: '' },
      {
        path: '',
        component: AppShellComponent,
        canActivateChild: [AuthGuard],
        children: [
          /* ... */
        ],
      },
    ],
  },
];
