import { Component, type OnInit } from '@angular/core';
import { DataTableComponent } from '../../components/common/data-table/data-table.component';
import { SharedModule } from '../../common/modules/shared.module';
import { ProductoService } from '../../services/producto.service';
import { ModalComponent } from '../../components/common/modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { FormBaseComponent } from '../../components/common/form-base/form-base.component';
import { ProveedorDTO } from '../../interfaces/proveedorDTO.interface';
import { ProductoDTO } from '../../interfaces/productoDTO.interface';
export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  helpText?: string;
  placeholder: string;
  options?: { key: string; name: string }[];
}
export interface ColumnDefinition {
  key: string;
  header: string;
  transform?: (value: any) => string;
}
@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [
    SharedModule,
    DataTableComponent,
    ModalComponent,
    FormBaseComponent,
  ],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent implements OnInit {
  constructor(
    private productService: ProductoService,
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.initForm();
  }
  initForm() {
    this.productoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', Validators.required],
      proveedorId: ['', Validators.required],
    });
  }

  proveedores: ProveedorDTO[] = [];
  selectedProduct?: any;
  productoForm!: FormGroup;
  isModalOpen = false;
  products: ProductoDTO[] = [];

  ngOnInit(): void {
    this.loadProductos();
    this.loadProveedores();
  }
  loadProductos() {
    this.productService.getAll().subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        this.products = response;
      },
      error: (error: any) => {
        console.error('Hubo un error al cargar los productos: ' + error);
      },
      complete: () => {
        console.log('Carga de productos exitosa');
        console.log(
          'productos: ' + this.products.map((p) => console.log(p)).join('\n')
        );
      },
    });
  }
  columns: ColumnDefinition[] = [
    {
      key: 'nombre', // propiedad real en el objeto de datos
      header: 'Producto', // texto que se muestra en la tabla
      transform: (value: string) => value,
    },
    {
      key: 'descripcion',
      header: 'Descripcion',
      transform: (value: string) => value,
    },
    {
      key: 'precio',
      header: 'Precio',
      transform: (value: number) => `$${value.toFixed(2)}`, // formatea el precio
    },
    {
      key: 'stock',
      header: 'Stock',
      transform: (value: number) => value.toString(), // convierte el stock a string
    },
    {
      key: 'proveedorId',
      header: 'Proveedor',
      transform: (value: number) => this.getProveedorName(value), // podrías transformar el ID a nombre
    },
  ];

  getProveedorName(value: number): string {
    const proveedor = this.proveedores.find((p) => p.id === value);
    return proveedor ? proveedor.nombre : 'No asignado';
  }
  // Para compatibilidad con tu código actual, podemos generar headerProduct desde columns
  get headerProduct(): string[] {
    return this.columns.map((col) => col.header);
  }
  get fieldForm(): FormField[] {
    return [
      {
        name: 'nombre',
        label: 'Producto',
        type: 'text',
        placeholder: 'Ingrese el nombre del Producto',
      },
      {
        name: 'descripcion',
        label: 'Descripcion',
        type: 'text',
        placeholder: 'Ingrese la Descripcion',
      },
      {
        name: 'precio',
        label: 'Precio',
        type: 'number',
        placeholder: 'Ingrese el Precio',
      },
      {
        name: 'stock',
        label: 'Stock',
        type: 'number',
        placeholder: 'Ingrese el Stock',
      },
      {
        name: 'proveedorId',
        label: 'Proveedor',
        type: 'select',
        placeholder: 'Selecione el Proveedor',
        options: this.proveedores.map((p) => ({
          key: String(p.id),
          name: p.nombre,
        })),
      },
    ];
  }

  loadProveedores() {
    this.proveedorService.getAll().subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        this.proveedores = response;
      },
      error: (error: any) => {
        console.error('Hubo un error al cargar los proveedores: ' + error);
      },
      complete: () => {
        console.log('Carga de proveedores exitosa');
        console.log('productos: ' + this.proveedores);
      },
    });
  }

  handleEdit(product: ProductoDTO): void {
    console.log(' Producto a actualizar:', product);
    if (product) {
      this.selectedProduct = product;
      this.productoForm.patchValue(this.selectedProduct);
      this.isModalOpen = true;
    }
  }

  handleDelete(product: ProductoDTO): void {
    this.productService.delete(product.id).subscribe({
      next: () => {
        console.log('Producto eliminado exitosamente');
        this.loadProductos();
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      },
    });
  }

  handleAdd(): void {
    // Implementar lógica de adición
    console.log('Agregar nuevo producto');
    this.initForm();
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
    this.initForm();
  }
  goSave(product: ProductoDTO) {
    if (this.productoForm.valid) {
      if (this.selectedProduct) {
        // Actualizar producto existente
        this.productService.update(product.id, product).subscribe({
          next: (response) => {
            console.log('Producto actualizado:', response);
            this.loadProductos();
            this.isModalOpen = false;
          },
          error: (error) => {
            console.error('Error al actualizar el producto:', error);
          },
        });
      } else {
        // Crear nuevo producto
        this.productService.create(product).subscribe({
          next: (response) => {
            console.log('Producto creado:', response);
            this.loadProductos();
            this.isModalOpen = false;
          },
          error: (error) => {
            console.error('Error al crear el producto:', error);
          },
        });
      }
    }
  }
}
