import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DatosCliente } from '../pais/cliente.interface';


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
    
    let data: DatosCliente = {
      nombre      : cliente.value.nombre,
      apellido    : cliente.value.apellido,
      edad        : cliente.value.edad, 
      fNacimiento : cliente.value.fNacimiento,
      dniPasaporte: cliente.value.dniPasaporte,
      pais        : cliente.value.pais[0].name,
      fIngreso    : cliente.value.fIngreso,
      fPartida    : cliente.value.fPartida,
      genero      : cliente.value.genero,
      email       : cliente.value.email,
      flag          : cliente.value.pais[0].flag
    };

    console.log('Guardar en DB', data);

    // Guardar documento en CloudFirestore
    this.cloudFirestore.collection("clientes").doc(data.dniPasaporte).set(data).then( (docRef) =>{
      console.log('Datos guardados correctamente');
      
    });

    
  }

}
