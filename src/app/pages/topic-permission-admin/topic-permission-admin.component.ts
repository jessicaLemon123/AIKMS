import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export type PermissionType = 'READ' | 'CREATE' | 'EDIT' | 'DELETE';

export interface PermissionDetail {
  permissionType: PermissionType;
  users: string[];
  groups: string[];
}

export interface Topic {
  id: number;
  name: string;
  permissions: PermissionDetail[];
}

@Component({
  selector: 'app-topic-permission-admin',
  templateUrl: './topic-permission-admin.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TopicPermissionAdminComponent {
  permissionTypes: PermissionType[] = ['READ', 'CREATE', 'EDIT', 'DELETE'];

  topics: Topic[] = [
    {
      id: 1,
      name: '財務管理',
      permissions: [
        { permissionType: 'READ', users: ['王小明'], groups: ['財務部'] },
        { permissionType: 'EDIT', users: ['王小明'], groups: [] },
      ],
    },
    {
      id: 2,
      name: '技術交流',
      permissions: [
        { permissionType: 'READ', users: [], groups: ['工程組'] },
        { permissionType: 'CREATE', users: ['Jessica'], groups: [] },
      ],
    },
  ];

  editingTopic: Topic | null = null;
  editBuffer: {
    [type in PermissionType]: { usersStr: string; groupsStr: string };
  } = {
    READ: { usersStr: '', groupsStr: '' },
    CREATE: { usersStr: '', groupsStr: '' },
    EDIT: { usersStr: '', groupsStr: '' },
    DELETE: { usersStr: '', groupsStr: '' },
  };
  asPermType(x: unknown): PermissionType {
    return x as PermissionType;
  }

  hasPermission(topic: Topic, type: PermissionType): boolean {
    const perm = topic.permissions.find((p) => p.permissionType === type);
    return !!(perm && (perm.users.length > 0 || perm.groups.length > 0));
  }

  editPermissions(topic: Topic) {
    this.editingTopic = topic;
    for (const type of this.permissionTypes) {
      const perm = topic.permissions.find((p) => p.permissionType === type);
      this.editBuffer[type].usersStr = perm ? perm.users.join(',') : '';
      this.editBuffer[type].groupsStr = perm ? perm.groups.join(',') : '';
    }
  }

  cancelEdit() {
    this.editingTopic = null;
  }

  saveEdit() {
    if (!this.editingTopic) return;
    for (const type of this.permissionTypes) {
      const users = this.editBuffer[type].usersStr
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      const groups = this.editBuffer[type].groupsStr
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      let perm = this.editingTopic.permissions.find(
        (p) => p.permissionType === type
      );
      if (!perm) {
        // 新增權限
        perm = { permissionType: type, users: [], groups: [] };
        this.editingTopic.permissions.push(perm);
      }
      perm.users = users;
      perm.groups = groups;
    }
    this.editingTopic = null;
    // TODO: 可以呼叫 API 儲存到後端
  }
}
