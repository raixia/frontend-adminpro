import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  get token(): string {
    return localStorage.getItem('token') || ''
  }

  buscar(tipo: 'usuarios' | 'productos' | 'categorias' | 'ventas' | 'movimientos', termino: string = '') {
    const url = `${base_url}/buscar/${tipo}/${termino}`
    return this.http.get(url, this.headers)
  }
}
