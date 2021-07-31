import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuarioConectado: any;

  constructor( private authentication: AngularFireAuth, private router: Router ) { }

  login(email:string, password: string){

    this.authentication.signInWithEmailAndPassword(email, password).then((user) =>{

      console.log('USUARIO AUTENTICADO CORRECTAMENTE');
      console.log(user);

      this.usuarioConectado = user;

      this.router.navigate(['./hostel-app/inicio']);

      
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  }
}
