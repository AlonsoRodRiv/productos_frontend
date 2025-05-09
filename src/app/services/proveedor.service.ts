import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CrudServiceImpl } from '../common/class/CrudServiceImpl';
import type { ProveedorDTO } from '../interfaces/proveedorDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService extends CrudServiceImpl<ProveedorDTO, number> {
  constructor(http: HttpClient) {
    super(
      http,
      'https://5b3b-190-86-106-207.ngrok-free.app/api',
      'proveedores'
    );
  }
}
