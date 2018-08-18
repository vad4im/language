import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-clauses-kit-detail',
  templateUrl: './clauses-kit-detail.component.html',
  styleUrls: ['./clauses-kit-detail.component.css']
})
export class ClausesKitDetailComponent {

  constructor(public dialogRef: MatDialogRef<ClausesKitDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
