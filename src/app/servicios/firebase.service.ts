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

  constructor( private authentication: AngularFireAuth, private router: Router, private cloudFirestore: AngularFirestore ) { }


  /** AUTENTICACIÓN FIREBASE */

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


  /** CLOUD FIRESTORE */
  guardarCliente(cliente: FormGroup){
    const data = {
      nombre: 'Pepitosh',
      apellido: 'Oliva',
      dni: '366234333'
    };

    // Guardar documento en CloudFirestore
    this.cloudFirestore.collection("clientes").doc(data.dni).set(data).then( (docRef) =>{
      console.log('Datos guardados correctamente');
      
    });

    
  }

}