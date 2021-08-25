import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { fileItem } from '../models/filetiem';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: fileItem[] = []
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter()
  constructor() {
    console.log('directiva ejecutandose')


  }
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false)
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);
    const transferencia=this._getTransferencia(event);
    if(!transferencia){
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false)
  }
  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoFueDropeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer:event.originalEvent.dataTransfer;
  }
  private _extraerArchivos(archivosLista:FileList) {
    console.log(archivosLista);
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal=archivosLista[propiedad];
      if(this._archivoPuedeSerCargado(archivoTemporal)){
        const nuevoArchivo=new fileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }
  //validaciones
  private _prevenirDetener(event: any) {
    //evitar que el navegador abra la imagen por defecto
    event.preventDefault();
    event.stopPropagation();
  }
  private _archivoFueDropeado(nombreArchivo: string) {
    for (const archivo of this.archivos) {
      if (archivo.nombre === nombreArchivo) {
        console.log(`el archiv
        o ${nombreArchivo} ya existe`);
        return true
      }
    }
    return false;
  }
  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith(tipoArchivo);

  }

}
