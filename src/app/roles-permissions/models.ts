export interface RoleDto {
  id: number;
  name: string;
}

export interface PermissionDto {
  id: number;
  name: string;
}

export interface RolePermissionsDto {
  roleId: number;
  permissionIds: number[];
}
