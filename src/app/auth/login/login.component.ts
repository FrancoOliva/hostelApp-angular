import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginBasico: FormGroup = this.fb.group({
    email: ['', Validators.required ],
    password: ['', [Validators.required, Validators.minLength(8)] ]
  });

  constructor( private fb: FormBuilder, private auth: AngularFireAuth ) { }

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
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    console.log(this.loginBasico.value);
  }

}
