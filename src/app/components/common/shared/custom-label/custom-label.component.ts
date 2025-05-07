import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-label.component.html',
})
export class CustomLabelComponent {
  @Input() text: string = '';
  @Input() for: string = '';
  @Input() required: boolean | undefined = false;
  @Input() customClasses: string = '';
  @Input() helpText: string | undefined = '';

  showTooltip: boolean = false;
}
