import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {


  loginBasico: FormGroup = this.fb.group({
    email: ['', Validators.required ],
    password: ['', [Validators.required, Validators.minLength(8)] ]
  });

  constructor( private fb: FormBuilder, private auth: AngularFireAuth, private router: Router ) { }

  ngOnInit(): void {
  }

  ingresar(){

    // Si apretamos ingresar sin completar los datos
    // if( this.loginBasico.invalid ){
    //   this.loginBasico.markAllAsTouched();
    //   return;
    // }

    this.auth.signInWithEmailAndPassword(this.loginBasico.value.email, this.loginBasico.value.password).then((usuario) =>{

      console.log('USUARIO AUTENTICADO CORRECTAMENTE');

      this.router.navigate(['./hostel-app/inicio']);

      
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  }

}
