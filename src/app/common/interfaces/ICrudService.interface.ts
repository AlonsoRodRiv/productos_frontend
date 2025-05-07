import type { Observable } from 'rxjs';

export interface ICrudService<D, ID> {
  getAll(): Observable<D[]>;
  create(entity: D): Observable<D>;
  getById(id: ID): Observable<D>;
  update(id: ID, entity: D): Observable<D>;
  delete(id: ID): Observable<boolean>;
}
