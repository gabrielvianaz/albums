import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-album-dialog',
  templateUrl: './album-dialog.component.html',
  styleUrl: './album-dialog.component.css',
})
export class AlbumDialogComponent {
  @Output() previous = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
