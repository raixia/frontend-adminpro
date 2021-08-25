import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmited = false;
  public registerForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
      password2: new FormControl('', [Validators.required]),
      terminos: new FormControl(false, Validators.requiredTrue)
    })

  constructor(private fb: FormBuilder,
              private UsuariosService:UsuariosService,
              private router:Router ) { }

  ngOnInit(): void {
  }
  crearUsuario() {
    this.formSubmited = true;
    
    if (this.registerForm.valid && !this.pwdNovalidas() ) {
      this.UsuariosService.crearUsuario(this.registerForm.value)
      .subscribe(resp=>{
        console.log('UsuarioCreado')
        console.log(resp)
        Swal.fire('Success','Usuario creado correctamente','success')
        this.router.navigateByUrl('/login')

      },(err)=>{
        Swal.fire('Error',err.error.errors[0].msg,'error')
      }
        /*console.warn(err.error.errors[0].msg)*/
      )
    } else {
      console.log('Formulario no es correcto')
      this.registerForm.controls.password2.setErrors({NoEsIgual:true})
    }

  }
  campoNoValido(campo: string) {
    let x = this.registerForm.get(campo) as FormControl

    if (x.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos() {
    let y = this.registerForm.get('terminos') as FormControl
    return !y.value && this.formSubmited
  }
  pwdNovalidas() {
    let pwd1 = this.registerForm.get('password') as FormControl
    let pwd2 = this.registerForm.get('password2') as FormControl
    if (pwd1.value !== pwd2.value && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }


}
