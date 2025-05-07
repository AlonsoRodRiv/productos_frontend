import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../common/modules/shared.module';
import type { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
})
export class CustomSelectComponent {
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() options: { key: string; name: string }[] = [];

  @Input() control!: FormControl;
  // @Input() options: any[] = [];
  get errorMessage(): string {
    if (this.control?.errors && (this.control.dirty || this.control.touched)) {
      if (this.control.errors['required']) return 'Este campo es requerido';
      // Puedes agregar más mensajes de error según necesites
    }
    return '';
  }

  get hasError(): boolean | null {
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }
}
