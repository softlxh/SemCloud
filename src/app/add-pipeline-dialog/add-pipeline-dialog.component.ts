import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pipeline-dialog',
  templateUrl: './add-pipeline-dialog.component.html',
  styleUrls: ['./add-pipeline-dialog.component.css']
})
export class AddPipelineDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPipelineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.data.name);
  }

}
