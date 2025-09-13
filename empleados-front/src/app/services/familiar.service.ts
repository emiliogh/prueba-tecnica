import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Familiar } from '../models/familiar.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FamiliarService {
  private apiUrl = `${environment.apiBaseUrl}/familiares`;

  constructor(private http: HttpClient) {}

  getFamiliaresByEmpleado(id_empleado: number): Observable<Familiar[]> {
    return this.http.get<Familiar[]>(`${environment.apiBaseUrl}/empleados/${id_empleado}/familiares`);
  }

  addFamiliar(familiar: Familiar): Observable<Familiar> {
    return this.http.post<Familiar>(`${environment.apiBaseUrl}/empleados/${familiar.id_empleado}/familiares`, familiar);
  }

  deleteFamiliar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
