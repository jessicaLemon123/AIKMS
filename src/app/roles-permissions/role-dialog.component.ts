import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-role-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css'],
})
export class RoleDialogComponent {
  dialogRef = inject(MatDialogRef<RoleDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as {
    mode: 'create' | 'edit';
    role?: { name: string; description?: string | null };
  };
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: [
      this.data?.role?.name ?? '',
      [Validators.required, Validators.minLength(2)],
    ],
    description: [this.data?.role?.description ?? ''],
  });

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
