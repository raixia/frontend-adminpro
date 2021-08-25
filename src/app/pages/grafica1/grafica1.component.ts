import { Component, OnInit } from '@angular/core';
import { fileItem } from 'src/app/models/filetiem';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  estaSobreElemento = false;
  archivos: fileItem[] = [];
  fila:any[]=[];

  constructor(public _cargaImagenes: CargaImagenesService) {
    console.log('prueba de angular')
  }

  ngOnInit(): void {
  }
  cargaImagenes() {
    this._cargaImagenes.cargarImagenes(this.archivos)
  }
  mouseSobreElemento(event: any) {
    console.log(event)

  }
  limpiarArchivos(){
    this.archivos=[];
  }

}
