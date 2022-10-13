import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() closeEvent = new EventEmitter();

  closeDialog() {
    this.closeEvent.emit();
  }
}
