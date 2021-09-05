import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { usuario } from 'src/app/models/usuario';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario!: usuario
  public imagenSubir: any
  public imgTemp:any=null
  public botonimg:boolean=false

  public perfilForm: FormGroup = new FormGroup({ })
  constructor(private usuarioServices: UsuariosService, private fb: FormBuilder, private fileUploadService: FileuploadService) {

    this.usuario = usuarioServices.usuario
    
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(5)]],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
    })
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  actualizarPerfil() {
    console.log(this.perfilForm.value)
    this.usuarioServices.actualizarPerfil(this.perfilForm.value).subscribe(
      resp => {
        const { nombre, correo } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.correo = correo;
        Swal.fire('Guardado','Cambios fueron Guardados','success')
      },(err)=>{
        Swal.fire('Error','El correo ya existe','error')
        console.log(err)
      }
    )
  }
  cambiarImagen(file: any) {
 //   console.log(file.target.files[0])
     if(!file.target.files[0]){
      return this.imgTemp=null
    }
    this.imagenSubir = file.target.files[0]
  //  console.log(imagenSubir)
   
    //this.imagenSubir=file.target.files[0]
    const reader= new FileReader();
    reader.readAsDataURL(file.target.files[0])
    reader.onloadend=()=>{
      this.imgTemp=reader.result
      console.log(reader.result)
    }
    return this.imagenSubir
   
  }
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, this.usuario.uid || '').then((img:any) => {
        this.usuario.img![0]=img
      console.log(this.usuario.img![0])
      console.log(img)
      Swal.fire('Guardado','Cambios fueron Guardados','success')
    }).catch(err=>{
      Swal.fire('Error',err.error.msg,'error')
    })
    console.log('esta es la imagina a subir');
  }
  definirformulario() {

  }

}
