import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DatosCliente } from '../interfaces/cliente.interface';
import { Pagos } from '../interfaces/pagos.interface';
import { Gastos } from '../interfaces/gastos.interface';
import { Habitacion } from '../interfaces/habitacion.interface';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuarioConectado: any;
  loginError: string = "";
  private _habitacionesM: Habitacion[] = [];

  public get habitacionesM(): Habitacion[] {
    return [...this._habitacionesM];
  }
  



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

  crearHabitacion(habitacion: Habitacion){

    console.log('Habitación Creada', habitacion);
    
    // this.cloudFirestore.collection('habitaciones_matrimoniales').doc(habitacion.id).set(habitacion);
  }

  

}
