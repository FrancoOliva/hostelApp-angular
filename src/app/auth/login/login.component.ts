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

  ingresar(){

    // Si apretamos ingresar sin completar los datos
    // if( this.loginBasico.invalid ){
    //   this.loginBasico.markAllAsTouched();
    //   return;
    // }

    // Servicio 
    this.auth.login(this.loginBasico.value.email,this.loginBasico.value.password);

  }

}
