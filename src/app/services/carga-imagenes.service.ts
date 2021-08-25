import { Injectable } from '@angular/core';
import { fileItem } from '../models/filetiem';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  constructor() { }
  cargarImagenes(imagenes:fileItem[]){
    console.log(imagenes);
  }
}
