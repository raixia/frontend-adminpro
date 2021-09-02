import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuario';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  public img: any;
  public usuario!: usuario;
  constructor(private SidebarService: SidebarService,
    private usuariosServices: UsuariosService) {
    this.usuario = usuariosServices.usuario
    this.menuItems = SidebarService.menu;
    //this.img=usuariosServices.usuario.imagenUrl solo estoy importando el this.usuarios menos la this.img por eso es que no se actualiza el this.usuario esta referenciado y el this.img no
    console.log(this.menuItems)
  }
  logout() {
    this.usuariosServices.logout()
  }

  ngOnInit(): void {
  }

}
