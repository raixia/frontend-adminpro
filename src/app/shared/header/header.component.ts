import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario!:usuario;
  public img:any;
  constructor(private usuariosService:UsuariosService) { 
  this.usuario=usuariosService.usuario
  /*  if(this.usuario.img?.length===0){
      this.img='https://laverdadnoticias.com/__export/1619798871248/sites/laverdad/img/2021/04/30/series_anime_kawaii_recomendaciones.jpg_2039590105.jpg'
    }else {
      this.img=this.usuario.img![0]
    }
    */
    //this.img=usuariosService.usuario.imagenUrl
   }
  
  ngOnInit(): void {
  }
  logout(){
    this.usuariosService.logout()
  }
}
