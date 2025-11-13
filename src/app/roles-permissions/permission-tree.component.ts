import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDto } from './models';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'app-permission-tree',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.css'],
})
export class PermissionTreeComponent {
  @Input() permissions: PermissionDto[] = []; // [{ id, name }]
  @Input() selectedIds: number[] = [];
  @Output() selectedIdsChange = new EventEmitter<number[]>();

  private selected = signal<Set<number>>(new Set<number>());

  ngOnChanges() {
    this.selected.set(new Set(this.selectedIds));
  }

  isChecked(id: number) {
    return this.selected().has(id);
  }

  onToggle(e: MatCheckboxChange, id: number) {
    const s = new Set(this.selected());
    e.checked ? s.add(id) : s.delete(id);
    this.selected.set(s);
    this.selectedIdsChange.emit(Array.from(s));
  }

  selectAll() {
    const s = new Set<number>(this.permissions.map((p) => p.id));
    this.selected.set(s);
    this.selectedIdsChange.emit(Array.from(s));
  }

  clearAll() {
    this.selected.set(new Set());
    this.selectedIdsChange.emit([]);
  }

  trackPerm = (_: number, row: PermissionDto) => row.id;
}
