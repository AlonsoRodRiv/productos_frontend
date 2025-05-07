import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared.module';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() close = new EventEmitter();
}
