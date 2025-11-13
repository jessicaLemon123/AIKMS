import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PermissionDto } from './models';

@Injectable({ providedIn: 'root' })
export class PermissionsApiService {
  private http = inject(HttpClient);

  // GET /api/roles/permissions/all -> List<PermissionDTO>
  listAll(): Observable<PermissionDto[]> {
    return this.http.get<PermissionDto[]>(
      'http://localhost:8080/api/roles/permissions/all'
    );
  }
}
