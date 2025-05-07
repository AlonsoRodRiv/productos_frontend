import type { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ICrudService } from '../interfaces/ICrudService.interface';

export abstract class CrudServiceImpl<D, ID> implements ICrudService<D, ID> {
  protected apiUrl: string;

  constructor(protected http: HttpClient, apiUrl: string, endpoint: string) {
    this.apiUrl = `${apiUrl}/${endpoint}`;
  }

  getAll(): Observable<D[]> {
    return this.http.get<D[]>(this.apiUrl);
  }
  create(dto: D): Observable<D> {
    return this.http.post<D>(this.apiUrl, dto);
  }
  getById(id: ID): Observable<D> {
    return this.http.get<D>(`${this.apiUrl}/${id}`);
  }

  update(id: ID, dto: D): Observable<D> {
    return this.http.put<D>(`${this.apiUrl}/${id}`, dto);
  }
  delete(id: ID): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }
}
