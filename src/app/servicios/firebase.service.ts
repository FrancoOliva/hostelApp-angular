import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuarioConectado: any;
  loginError: string = "";

  constructor( private authentication: AngularFireAuth, private router: Router, private cloudFirestore: AngularFirestore ) { }


  /** AUTENTICACIÓN FIREBASE */

  login(email:string, password: string){

    this.authentication.signInWithEmailAndPassword(email, password).then((user) =>{

      // console.log('USUARIO AUTENTICADO CORRECTAMENTE');
      // console.log(user);

      this.usuarioConectado = user;

      this.router.navigate(['./hostel-app/inicio']);

      
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;

      if( errorCode == 'auth/wrong-password'){
        this.loginError = 'Auth: Contraseña incorrecta.'
        console.log(this.loginError);
      } else if( errorCode == 'auth/user-not-found'){
        this.loginError = 'Auth: El usuario no existe.'
        console.log(this.loginError);
      } else {
        console.log(errorCode);
        console.log(errorMessage);
        this.loginError = errorMessage;
      }  

    });

  }


  /** CLOUD FIRESTORE */
  guardarCliente(cliente: FormGroup){
    const data = cliente;

    console.log('Guardar en DB', data);

    // Guardar documento en CloudFirestore -> FUNCIONA
    // this.cloudFirestore.collection("clientes").doc(data.dni).set(data).then( (docRef) =>{
    //   console.log('Datos guardados correctamente');
      
    // });

    
  }

}
