import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    span:hover {
      cursor: pointer;
      color: #FFF47D;
    }
    `
  ]
})
export class LoginComponent implements OnInit {


  loginBasico: FormGroup = this.fb.group({
    email: ['', Validators.required ],
    password: ['', [Validators.required, Validators.minLength(8)] ]
  });

  nuevoUsuario: FormGroup = this.fb.group({
    email: ['' , [ Validators.required, Validators.email ] ],
    password1: ['', [ Validators.required, Validators.minLength(8) ] ],
    password2: ['', [ Validators.required, Validators.minLength(8) ] ]
  });

  restClave: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ] ]
  })

  display1: boolean = false;

  display2: boolean = false;

  constructor( private fb: FormBuilder, private auth: FirebaseService ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){

    
    
    if( this.loginBasico.invalid ){

      console.log('Se apretó iniciar sesión sin completar email y contraseña');
      this.loginBasico.markAllAsTouched();

      return;

    }

    // Servicio
    // console.log('Iniciando...');
    this.auth.login(this.loginBasico.value.email,this.loginBasico.value.password);
    this.loginBasico.reset();

    

  }

  crearUsuario(){
    
    if( this.nuevoUsuario.invalid ){
      console.log('Datos del usuario nuevo incompletos.');
      this.nuevoUsuario.markAllAsTouched;
      return;
    }

    if( this.nuevoUsuario.value.password1 == this.nuevoUsuario.value.password2 ){
      // console.log('Contraseñas verificadas.');

      this.auth.crearUsuarioAuth(this.nuevoUsuario.value.email, this.nuevoUsuario.value.password2);
      this.nuevoUsuario.reset();
      this.display1 = false;

    } else {
      console.log('Las contraseñas no coinciden.');
    }
    

  }

  recuperarClave(){

    if( this.restClave.invalid ){

      return;

    } else {
      console.log('Recuperando contraseña...');
      this.auth.recuperarContraseña(this.restClave.value.email);
    }

    this.display2 = false;

  }

  mostrarDialog1(){

    this.display1 = true;
  }

  mostrarDialog2(){

    this.display2 = true;
  }

}
