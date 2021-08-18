import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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

  loginError: string = "Texto de prueba";
  usuarioConectado: any;


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

  constructor( private fb: FormBuilder, private auth: FirebaseService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  iniciarSesion(){

    
    
    if( this.loginBasico.invalid ){

      this.messageService.add({severity:'error', summary: 'Error', detail: 'Completar todos los campos para iniciar sesión.'});
      
      this.loginBasico.markAllAsTouched();

      return;

    }

    
    this.auth.login(this.loginBasico.value.email,this.loginBasico.value.password).then((user) =>{

      //this.messageService.add({severity:'success', summary: 'Auth', detail: 'Usuario autenticado con éxito.'});

      this.usuarioConectado = user;

      this.router.navigate(['./hostel-app/menu']);

      
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;

      if( errorCode == 'auth/wrong-password'){
        
        this.messageService.add({severity:'error', summary: 'Error', detail: 'La contraseña es incorrecta.'});

      } else if( errorCode == 'auth/user-not-found'){

        this.messageService.add({severity:'error', summary: 'Error', detail: 'El usuario no existe/no fue encontrado.'});

      } else {
        console.log(errorCode);
        console.log(errorMessage);
        
        this.messageService.add({severity:'error', summary: errorCode, detail: errorMessage});
      }

    });

    this.loginBasico.reset();

    

  }

  crearUsuario(){
    
    if( this.nuevoUsuario.invalid ){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Es necesario completar todos los campos.'});
      this.nuevoUsuario.markAllAsTouched;
      return;
    }

    if( this.nuevoUsuario.value.password1 == this.nuevoUsuario.value.password2 ){
      // console.log('Contraseñas verificadas.');

      this.auth.crearUsuarioAuth(this.nuevoUsuario.value.email, this.nuevoUsuario.value.password2).then(()=>{

        this.messageService.add({severity:'success', summary: 'Datos OK', detail: 'Nuevo usuario creado con éxito.'});

      }).catch((error) => {
        
        this.messageService.add({severity:'error', summary: error.code, detail: error.message});
      });
      
      this.display1 = false;

    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas son diferentes.'});
    }
    
    this.nuevoUsuario.reset();
  }

  recuperarClave(){

    if( this.restClave.invalid ){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Campo incompleto.'});
      this.restClave.markAllAsTouched;
      return;

    } else {
      
      this.auth.recuperarContraseña(this.restClave.value.email).then(() => {
        this.messageService.add({severity:'success', summary: 'Clave', detail: 'Clave recuperada con éxito. Verifica tu correo.'});
      }).catch((e) => {
        
        this.messageService.add({severity:'error', summary: e.code, detail: e.message});
      });

      this.restClave.reset();
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
