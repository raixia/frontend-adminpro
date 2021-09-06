import { Injectable,EventEmitter } from '@angular/core';

import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true
  public id: string = ''
  public img: string = ''
  public nuevaImagen:EventEmitter<string>=new EventEmitter<string>()
  get ocultarModal() {
    return this._ocultarModal;
  }
  abrirModal(user: usuario) {


    if (user.img?.length == 0) {
      this.img = 'https://png.pngtree.com/png-clipart/20190610/original/pngtree-userpeoplelinear-iconuser-png-image_1859764.jpg'
    } else {
      this.img = user.img![0]
    }
    this.id=user.uid!
    this._ocultarModal = false
  }
  cerrarModal() {
    this._ocultarModal = true
  }

  constructor() {

  }

}
