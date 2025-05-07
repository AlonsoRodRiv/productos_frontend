import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../interfaces/productoDTO.interface';
import { CrudServiceImpl } from '../common/class/CrudServiceImpl';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends CrudServiceImpl<ProductoDTO, number> {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api', 'productos');
  }
}
