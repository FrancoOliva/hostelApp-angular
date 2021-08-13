import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DatosCliente } from '../interfaces/cliente.interface';
import { Pagos } from '../interfaces/pagos.interface';
import { Gastos } from '../interfaces/gastos.interface';
import { Camas, Habitacion } from '../interfaces/habitacion.interface';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';


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

      this.router.navigate(['./hostel-app/menu']);

      
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
      flag        : cliente.value.pais[0].flag
    };

    // console.log('Guardar en DB', data);

    // Guardar cliente en CloudFirestore
    this.cloudFirestore.collection("clientes").doc(data.dniPasaporte).set(data).then( (docRef) =>{
      console.log('Datos guardados correctamente');
      
    });

    
  }

  guardarPago(pagos: FormGroup){

    let data: Pagos = {
      nombre    : pagos.value.nombre,
      apellido  : pagos.value.apellido,
      fIngreso  : pagos.value.fIngreso,
      fPartida  : pagos.value.fPartida,
      importe   : pagos.value.importe,
      fPago     : pagos.value.fPago
    }


    // Guardar pago en CloudFirestore
    this.cloudFirestore.collection('pagos').add(data).then((docRef) => {
      console.log('Pago guardado correctamente en la base de datos.');
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    })
  }

  guardarGasto(gastos: FormGroup){

    let data: Gastos = {
      nombre: gastos.value.nombre,
      motivo: gastos.value.motivo,
      fGasto: gastos.value.fGasto,
      importe: gastos.value.importe      
    }


    // Guardar pago en CloudFirestore
    this.cloudFirestore.collection('gastos').add(data).then((docRef) => {
      console.log('Gasto guardado correctamente en la base de datos.');
    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    })
  }

  /** PENDIENTE VER BIEN CLOUDFIRESTORE */
  
  crearHabitacion(tipo: string, dato:Habitacion){

    if(tipo == 'matrimoniales'){
      this.cloudFirestore.collection('habitaciones_matrimoniales').doc(dato.id).set(dato).then(()=>{
        // console.log('Habitación creada con éxito.');
      }).catch((error)=>{
        console.log(error.code);
        console.log(error.message);
      });
    } else {
      this.cloudFirestore.collection('habitaciones_compartidas').doc(dato.id).set(dato).then(()=>{
        // console.log('Habitación creada con éxito.');
      }).catch((error)=>{
        console.log(error.code);
        console.log(error.message);
      })
    }
  }

  obtenerHabitaciones(tipo:string): Observable<Habitacion[]>{

     if(tipo == 'matrimoniales'){
      return this.cloudFirestore.collection<Habitacion>('habitaciones_matrimoniales').valueChanges();
     } else {
      return this.cloudFirestore.collection<Habitacion>('habitaciones_compartidas').valueChanges();
     }
    
  }

  crearCamas(tipo:string, id_habitacion:string){

    if(tipo == 'matrimoniales'){
      this.cloudFirestore.collection('camas_matrimoniales').add({
        id      : id_habitacion, 
        estado  : 'Sin ocupar',
        cliente : 'Sin asignar',
        fIngreso: new Date(),
        fPartida: new Date(),
      }).then((doc) => {
        // console.log('Cama creada con éxito.');
        
      }).catch((error) =>{
        console.log(error.code);
        console.log(error.message);
      });

    } else {
      this.cloudFirestore.collection('camas_compartidas').add({
        id      : id_habitacion, 
        estado  : 'Sin ocupar',
        cliente : 'Sin asignar',
        fIngreso: new Date(),
        fPartida: new Date(),
      }).then((doc) => {
        // console.log('Cama creada con éxito.');
        
      }).catch((error) =>{
        console.log(error.code);
        console.log(error.message);
      });
    }

  }

  obtenerCamas(tipo:string):Observable<Camas[]>{
    
    if(tipo == 'matrimoniales'){
      return this.cloudFirestore.collection<Camas>('camas_matrimoniales').valueChanges();
    } else {
      return this.cloudFirestore.collection<Camas>('camas_compartidas').valueChanges();
    }
  }

  

}
