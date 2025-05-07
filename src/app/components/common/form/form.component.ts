import {
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from '../../../common/modules/shared.module';
import { Supplier } from '../../../interfaces/proveedorDTO.interface';
import { Category } from '../../../interfaces/category.interface';
import { ProveedorService } from '../../../services/proveedor.service';
import { CategoriaService } from '../../../services/categoria.service';
import type { FormField } from '../../../views/products-view/products-view.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() categories: Array<any> = [];
  @Input() suppliers: Array<any> = [];
  @Input() form!: FormGroup;
  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Input() campos: FormField[] = [];
  // @Input() campos: Array<{
  //   name: string;
  //   label: string;
  //   type?: string;
  //   placeholder?: string;
  //   options? : any;
  // }> = [];

  // Create a method to get options for a select field
  getOptionsForField(field: FormField): any[] {
    return [];
    // if (!field.options) return [];

    // switch (field.options) {
    //   case 'categories':
    //     console.log('CategoriasBox : ', this.categories);
    //     return this.categories;
    //   case 'suppliers':
    //     return this.suppliers;
    //   default:
    //     return [];
    // }
  }
}
