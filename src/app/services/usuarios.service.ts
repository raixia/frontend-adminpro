import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.iterface';
import { loginForm } from '../interfaces/login-form.inteface';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // public uidUsu:any
  public usuario!: usuario
  constructor(private http: HttpClient, private router: Router,/*public usu:usuario*/) { }
  crearUsuario(formData: registerForm) {
    console.log('creando usuario')
    return this.http.post(`${base_url}/usuario`, formData)

  }
  get token(): string {
    return localStorage.getItem('token') || ''
  }
  get xuid(): string {
    return this.usuario.uid || ''
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/auth/renovarToken`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((resp: any) => {
      const { nombre, correo, rol, img, uid } = resp.usuario
      this.usuario = new usuario(nombre, correo, '', rol, img, uid)
      //this.usuario.imprimirUsuario()
      // console.log(resp.usuario)
      //   this.uidUsu=resp.usuario.uid
      console.log(this.usuario)
      localStorage.setItem('token', resp.token)
    }), map(resp => true),
      catchError(error => {
        console.log(error)
        return of(false)

      }


      )
    )
  }

  actualizarPerfil(data: { correo: string, nombre: string }) {
    console.log('este es el : ' + this.xuid)
    return this.http.put(`${base_url}/usuario/${this.xuid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  login(formdata: loginForm) {
    return this.http.post(`${base_url}/auth`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)

      })
    )
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }



}
