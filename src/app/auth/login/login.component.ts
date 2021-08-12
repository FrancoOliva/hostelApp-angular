import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

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

}
