import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../interfaces/productoDTO.interface';
import { CrudServiceImpl } from '../common/class/CrudServiceImpl';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends CrudServiceImpl<ProductoDTO, number> {
  constructor(http: HttpClient) {
    super(http, 'https://5b3b-190-86-106-207.ngrok-free.app/api', 'productos');
  }
}
