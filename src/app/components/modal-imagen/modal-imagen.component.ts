import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir: any
  public imgTemp: any = null

  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileuploadService) {
    // modalImagenService.ocultarModal
  }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.imgTemp = null
    this.modalImagenService.cerrarModal();
  }
  cambiarImagen(file: any) {
    //   console.log(file.target.files[0])
    if (!file.target.files[0]) {
      return this.imgTemp = null
    }
    this.imagenSubir = file.target.files[0]
    //  console.log(imagenSubir)

    //this.imagenSubir=file.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0])
    reader.onloadend = () => {
      this.imgTemp = reader.result
      console.log(reader.result)
    }
    // this.modalImagenService.img
    return this.imagenSubir

  }
  subirImagen() {
    let ide = this.modalImagenService.id
    this.fileUploadService.actualizarFoto(this.imagenSubir, ide).then((img: any) => {

      Swal.fire('Guardado', 'Cambios fueron Guardados', 'success')
      console.log(img)
      this.modalImagenService.nuevaImagen.emit(img)
      this.cerrarModal();
    }).catch(err => {
      Swal.fire('Error', err.error.msg, 'error')

    })
  }


}
