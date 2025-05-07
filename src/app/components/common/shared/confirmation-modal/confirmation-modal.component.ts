import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../../common/modules/shared.module';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
}
