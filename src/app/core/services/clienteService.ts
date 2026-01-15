import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { Config } from '../config';
import { Cliente } from '../../models/cliente';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly baseUrl: string;
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();
  
  // Agregar headers por defecto
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient, private config: Config) {
    this.baseUrl = this.config.apiUrl + 'clientes';
  }

  obtenerTodos(): Observable<Cliente[]> {
    return this.http
      .get<ApiResponse<Cliente[]>>(`${this.baseUrl}/all`)
      .pipe(
        map(resp => {
          if (!resp.procesoCorrecto) {
            throw new Error(resp.mensaje ?? 'Error desconocido');
          }
          // Emitir los datos al BehaviorSubject
          this.clientesSubject.next(resp.retorno);
          return resp.retorno;
        })
      );
  }

  obtenerPorId(id: number): Observable<Cliente> {
    return this.http
      .get<ApiResponse<Cliente>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(resp => {
          if (!resp.procesoCorrecto) {
            throw new Error(resp.mensaje ?? 'Error desconocido');
          }
          return resp.retorno;
        })
      );
  }

  crear(cliente: Cliente): Observable<any> {
    console.log('POST', this.baseUrl, cliente);
    // Agregar httpOptions aquí
    return this.http.post(`${this.baseUrl}`, cliente, this.httpOptions)
      .pipe(
        map((resp: any) => {
          if (!resp.procesoCorrecto) {
            throw new Error(resp.mensaje ?? 'Error al crear cliente');
          }
          // Recargar la lista después de crear
          this.recargarClientes();
          return resp;
        })
      );
  }

  // Método para recargar la lista de clientes
  recargarClientes(): void {
    this.obtenerTodos().subscribe();
  }

  actualizar(id: number, cliente: Cliente): Observable<any> {
    // También agregar en PUT
    return this.http.put(`${this.baseUrl}/${id}`, cliente, this.httpOptions)
      .pipe(
        map((resp: any) => {
          if (!resp.procesoCorrecto) {
            throw new Error(resp.mensaje ?? 'Error al actualizar cliente');
          }
          return resp;
        })
      );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        map((resp: any) => {
          if (!resp.procesoCorrecto) {
            throw new Error(resp.mensaje ?? 'Error al eliminar cliente');
          }
          return resp;
        })
      );
  }
}