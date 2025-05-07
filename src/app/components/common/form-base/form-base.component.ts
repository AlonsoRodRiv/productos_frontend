import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, type AbstractControl } from '@angular/forms';
import { SharedModule } from '../../../common/modules/shared.module';
import { CustomSelectComponent } from '../shared/custom-select/custom-select.component';
import { CustomInputComponent } from '../shared/custom-input/custom-input.component';
import { FormField } from '../../../views/products-view/products-view.component';
import { CustomLabelComponent } from '../shared/custom-label/custom-label.component';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    SharedModule,
    CustomSelectComponent,
    CustomInputComponent,
    CustomLabelComponent,
  ],
  templateUrl: './form-base.component.html',
  styleUrl: './form-base.component.scss',
})
export class FormBaseComponent {
  @Input() form!: FormGroup;
  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Input() campos: FormField[] = [];
  // Variable para controlar si el formulario se ha intentado enviar
  attemptedSubmit = false;
  getOptions(field: FormField): { key: string; name: string }[] {
    return field.options || []; // Devuelve un arreglo vacío si options es undefined
  }
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl; // Devuelve el control como FormControl
  }

  // Método para marcar todos los campos como tocados
  markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // Manejo del envío del formulario
  onSubmit(): void {
    this.attemptedSubmit = true;
    this.markAllFieldsAsTouched();

    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  // Método para resetear el estado de intentos de envío
  resetSubmitAttempt(): void {
    this.attemptedSubmit = false;
  }

  // Método para limpiar el formulario
  resetForm(): void {
    this.form.reset();
    this.resetSubmitAttempt();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
  }
}
