import { Component, type OnInit } from '@angular/core';
import { SharedModule } from '../../common/modules/shared.module';
import { DataTableComponent } from '../../components/common/data-table/data-table.component';
import { ProveedorService } from '../../services/proveedor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../components/common/modal/modal.component';
import { FormBaseComponent } from '../../components/common/form-base/form-base.component';
import { ConfirmationModalComponent } from '../../components/common/shared/confirmation-modal/confirmation-modal.component';
import type { ProveedorDTO } from '../../interfaces/proveedorDTO.interface';
import type {
  ColumnDefinition,
  FormField,
} from '../products-view/products-view.component';

@Component({
  selector: 'app-suppliers-view',
  standalone: true,
  imports: [
    SharedModule,
    DataTableComponent,
    ModalComponent,
    FormBaseComponent,
    ConfirmationModalComponent,
  ],
  templateUrl: './suppliers-view.component.html',
  styleUrl: './suppliers-view.component.scss',
})
export class SuppliersViewComponent implements OnInit {
  suppliers: ProveedorDTO[] = [];
  proveedorForm!: FormGroup;
  isFormModalOpen = false;
  isDeleteModalOpen = false;
  proveedorSelected?: any;

  constructor(private proveedorService: ProveedorService) {}
  ngOnInit() {
    this.initForm();
    this.loadProveedores();
  }
  loadProveedores() {
    this.proveedorService.getAll().subscribe({
      next: (data: any) => {
        console.log('data: ', data);
        this.suppliers = data;
      },
      error: (error: any) => {
        console.error('Hubo un error al cargar los proveedores: ', error);
      },
      complete: () => {
        console.info('Proveedores cargados correctamente: ', this.suppliers);
      },
    });
  }
  initForm() {
    this.proveedorForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
    });
  }
  columns: ColumnDefinition[] = [
    { key: 'nombre', header: 'Proveedor' },
    { key: 'direccion', header: 'Direccion' },
  ];
  get fieldForm(): FormField[] {
    return [
      {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el Nombre',
      },
      {
        name: 'direccion',
        label: 'Direccion',
        type: 'text',
        placeholder: 'Ingrese la Direccion',
      },
    ];
  }

  closeFormModal() {
    this.isFormModalOpen = false;
    this.proveedorSelected = undefined;
    this.proveedorForm.reset();
  }
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.proveedorSelected = undefined;
  }

  handleEdit(supplier?: ProveedorDTO): void {
    // Implementar lógica de edición
    console.log('Editar proveedor:', supplier);
    if (supplier) {
      this.proveedorSelected = supplier;
      this.proveedorForm.patchValue(supplier);
      this.isFormModalOpen = true;
    }
  }

  handleDelete(supplier: ProveedorDTO): void {
    this.proveedorSelected = supplier;
    this.isDeleteModalOpen = true;
  }

  handleAdd(): void {
    // Implementar lógica de adición
    console.log('Agregar nuevo proveedor');
    this.proveedorForm.reset();
    this.isFormModalOpen = true;
  }
  goSave(proveedor: ProveedorDTO) {
    if (this.proveedorForm.valid) {
      console.log('Proveedor a guardar:', proveedor);
      const operacion = this.proveedorSelected
        ? this.proveedorService.update(this.proveedorSelected.id, proveedor)
        : this.proveedorService.create(proveedor);

      operacion.subscribe({
        next: () => {
          console.log(
            `Proveedor ${this.proveedorSelected ? 'actualizado' : 'creado'}`
          );
          this.loadProveedores();
          this.closeFormModal();
        },
        error: (error) => {
          console.error('Error saving proveedor:', error);
          // Add user feedback here
        },
      });
    }
  }
  onDelete() {
    if (this.proveedorSelected) {
      this.proveedorService.delete(this.proveedorSelected.id).subscribe({
        next: () => {
          console.log('Proveedor eliminado');
          this.loadProveedores();
          this.isDeleteModalOpen = false;
        },
      });
    }
  }
}
