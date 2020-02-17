import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  /**
     * Permite obtener todos los registros de clientes
     */
  public getAll() {
    return this.http.get(environment.apiUrl.clientes);
  }
}
