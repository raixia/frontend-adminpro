import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { usuario } from 'src/app/models/usuario';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public usuarios: usuario[] = []
  public totalUsuarios: Number = 0
  public desde: number = 0
  public cargando: boolean = true
  public usuariosTemnp: usuario[] = []
  public imgsubs: Subscription = new Subscription()
  constructor(private usuariosServices: UsuariosService,
    private busquedaServices: BusquedaService, private modalImagenService: ModalImagenService) {

  }

  ngOnInit(): void {
    // this.cargando=true
    this.cargarusuarios()
    this.imgsubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarusuarios())
  }
  ngOnDestroy() {
    this.imgsubs.unsubscribe();
  }

  cambiarRoles(user: usuario) {

    this.usuariosServices.cambiarRoles(user).subscribe(
      resp => {
        console.log(resp)
      }
    )
  }
  cargarusuarios() {
    this.usuariosServices.cargarUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      console.log()

      this.totalUsuarios = total
      if (usuarios.length !== 0) {
        this.usuarios = usuarios
      }
      this.cargando = false
      this.usuariosTemnp = usuarios
      console.log(this.usuarios)
      console.log(this.totalUsuarios)
    })
  }
  cambiarPagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarusuarios();
    // this.cargando=false
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemnp
    }
    console.log(termino)
    return this.busquedaServices.buscar('usuarios', termino).subscribe(
      (resp: any) => {
        const usuarios = resp.results.map((user: any) => new usuario(
          user.nombre, user.correo, '', user.rol, user.img, user.uid, user.estado
        ))
        console.log(resp.results)
        this.usuarios = usuarios
      }
    )
  }
  cambiarEstado(usuario: usuario) {
    let mensaje = ""
    let cabezera = ""
    let textoBoton = ""
    if (usuario.estado == "true") {
      mensaje = `estas seguro de activar el usuario ${usuario.nombre}`
      cabezera = `Activar Usuario`
      textoBoton = `Si ,activar`
      console.log('estas en el true')
    } else {
      cabezera = `Desactivar Usuario`
      mensaje = `estas seguro de activar el usuario ${usuario.nombre}`
      textoBoton = `Si ,desactivar`
    }
    Swal.fire({
      title: cabezera,
      text: mensaje,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: textoBoton
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServices.cambiarEstado(usuario).subscribe(resp => {
          console.log(resp)
        })
      } else {
        this.cargarusuarios()
      }
    })

  }
  abrirModal(user: usuario) {
    console.log(user)
    this.modalImagenService.abrirModal(user)
  }

}
