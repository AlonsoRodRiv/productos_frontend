import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from '../../../../common/modules/shared.module';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
})
export class CustomInputComponent {
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() type: string = '';

  get errorMessage(): string {
    if (this.control?.errors && (this.control.dirty || this.control.touched)) {
      if (this.control.errors['required']) return 'Este campo es requerido';
      if (this.control.errors['min']) return 'El valor debe ser mayor que 0';
      if (this.control.errors['email'])
        return 'El formato del email no es válido';
      if (this.control.errors['pattern']) return 'El formato no es válido';
      // Puedes agregar más mensajes de error según necesites
    }
    return '';
  }

  get hasError(): boolean | null {
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }
}
