import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuariosService,
              private router:Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('paso por el canActive del guard')
    return this.usuarioService.validarToken().pipe(
      tap(estaAutenticado=>{
        if(!estaAutenticado){
          this.router.navigateByUrl('/login')
        }
      })
    )

  }
}
