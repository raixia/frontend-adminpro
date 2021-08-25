import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/register-form.iterface';
import { loginForm } from '../interfaces/login-form.inteface';
import { tap } from 'rxjs/operators'
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private hhtp: HttpClient) { }
  crearUsuario(formData: registerForm) {
    console.log('creando usuario')
    return this.hhtp.post(`${base_url}/usuario`, formData)

  }
  login(formdata:loginForm){
    return this.hhtp.post(`${base_url}/auth`, formdata).pipe(
      tap( (resp:any)=>{
        localStorage.setItem('token',resp.token)
       
      })
    )
  }
}
