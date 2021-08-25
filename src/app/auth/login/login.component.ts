import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmited = false;
  public loginForm: FormGroup = new FormGroup(
    {
      correo: new FormControl(localStorage.getItem('correo') || '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
      remember: new FormControl(false)
    })
  constructor(private router:Router,
              private UsuariosService:UsuariosService) { }

  login(){
    
    //this.router.navigateByUrl('/')
    this.UsuariosService.login(this.loginForm.value).
      subscribe(resp=>{
        console.log(resp)
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('correo',this.loginForm.get('correo')?.value);
        }else{
          localStorage.removeItem('correo')
        }

      },(err)=>{
        console.log(err)
        Swal.fire('Error',err.error.msg,'error')
      })
    console.log(this.loginForm.value)
  }

  ngOnInit(): void {
  }

}
