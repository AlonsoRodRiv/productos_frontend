import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CrudServiceImpl } from '../common/class/CrudServiceImpl';
import type { ProveedorDTO } from '../interfaces/proveedorDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService extends CrudServiceImpl<ProveedorDTO, number> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api', 'proveedores');
  }
}
