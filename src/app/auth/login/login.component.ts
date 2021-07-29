import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  ingresar(){

    // Si apretamos ingresar sin completar los datos
    // if( this.loginBasico.invalid ){
    //   this.loginBasico.markAllAsTouched();
    //   return;
    // }

    console.log(this.loginBasico.value);
  }

}
