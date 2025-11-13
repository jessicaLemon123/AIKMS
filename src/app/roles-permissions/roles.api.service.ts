import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RoleDto, PermissionDto } from './models';

@Injectable({ providedIn: 'root' })
export class RolesApiService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/roles'; // 建議配 proxy

  // GET /api/roles -> List<RoleDTO>
  list(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.base);
  }

  // GET /api/roles/{roleId}/permissions -> Set<PermissionDTO>
  getRolePermissionIds(roleId: number): Observable<number[]> {
    return this.http
      .get<PermissionDto[]>(`${this.base}/${roleId}/permissions`)
      .pipe(map((list) => list.map((p) => p.id)));
  }

  // post /api/roles/{roleId}/permissions  body: { permissionIds:number[] }
  saveRolePermissions(roleId: number, permissionIds: number[]) {
    return this.http.post<{ roleId: number; permissionIds: number[] }>(
      `${this.base}/${roleId}/permissions`,
      { permissionIds }
    );
  }

  // 尚未實作的後端端點（先保留）
  create(_: { name: string }) {
    throw new Error('Not implemented by backend');
  }
  rename(_: number, __: { name: string }) {
    throw new Error('Not implemented by backend');
  }
  delete(_: number) {
    throw new Error('Not implemented by backend');
  }
}
