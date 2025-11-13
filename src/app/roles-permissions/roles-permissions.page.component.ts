import { Component, effect, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RoleDto, PermissionDto } from './models';
import { RolesApiService } from './roles.api.service';
import { PermissionsApiService } from './permissions.api.service';
import { PermissionTreeComponent } from './permission-tree.component';

@Component({
  standalone: true,
  selector: 'app-roles-permissions-page',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    PermissionTreeComponent,
  ],
  templateUrl: './roles-permissions.page.component.html',
  styleUrls: ['./roles-permissions.page.component.css'],
})
export class RolesPermissionsPageComponent {
  private rolesApi = inject(RolesApiService);
  private permsApi = inject(PermissionsApiService);
  private snack = inject(MatSnackBar);

  displayedColumns = ['name', 'actions'];

  roles = signal<RoleDto[]>([]);
  permissions = signal<PermissionDto[]>([]);
  selectedRoleId = signal<number | null>(null);
  selectedPermissionIds = signal<number[]>([]);

  // 搜尋 + 本地分頁
  q = signal('');
  size = 10;
  page = 0;

  constructor() {
    this.reload();
    this.loadPermissions();

    effect(() => {
      const id = this.selectedRoleId();
      if (id != null) this.loadRolePerms(id);
    });
  }

  // ⚠️ reload 不做過濾
  reload() {
    this.rolesApi.list().subscribe({
      next: (list) => {
        this.roles.set(list);
        if (!this.selectedRoleId() && list.length) this.select(list[0]);
      },
      error: () => this.snack.open('載入角色失敗', '關閉', { duration: 3000 }),
    });
  }

  // 所有權限
  loadPermissions() {
    this.permsApi.listAll().subscribe({
      next: (list) => this.permissions.set(list),
      error: () =>
        this.snack.open('載入權限列表失敗', '關閉', { duration: 3000 }),
    });
  }

  // 單一角色的權限 id 清單
  loadRolePerms(roleId: number) {
    this.rolesApi.getRolePermissionIds(roleId).subscribe({
      next: (ids) => this.selectedPermissionIds.set(ids ?? []),
      error: () =>
        this.snack.open('載入角色權限失敗', '關閉', { duration: 3000 }),
    });
  }

  // 左側清單互動
  select(r: RoleDto) {
    this.selectedRoleId.set(r.id);
  }
  selectedRole() {
    return this.roles().find((r) => r.id === this.selectedRoleId()!) || null;
  }

  // 右側勾選互動
  onPermChange(ids: number[]) {
    this.selectedPermissionIds.set(ids);
  }

  // 儲存
  save() {
    const id = this.selectedRoleId();
    if (id == null) return;
    this.rolesApi
      .saveRolePermissions(id, this.selectedPermissionIds())
      .subscribe({
        next: () => this.snack.open('已儲存', '關閉', { duration: 2000 }),
        error: () => this.snack.open('儲存失敗', '關閉', { duration: 3000 }),
      });
  }

  filteredRoles = computed(() => {
    const list = this.roles();
    const kw = this.q().trim().toLowerCase(); // ← 用 q()
    return kw
      ? list.filter((r) => (r.name || '').toLowerCase().includes(kw))
      : list;
  });

  total = computed(() => this.filteredRoles().length);
  pagedRoles = computed(() => {
    const start = this.page * this.size;
    return this.filteredRoles().slice(start, start + this.size);
  });

  onPage(e: PageEvent) {
    this.page = e.pageIndex;
    this.size = e.pageSize;
  }

  onSearchChange(val: string) {
    this.q.set(val ?? ''); // ← 用 q.set()
    this.page = 0;
  }
}
