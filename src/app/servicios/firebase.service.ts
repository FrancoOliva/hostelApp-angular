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
import { ListadoCliente } from '../pages/compartidas/compartidas.component';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {  
  

  constructor( private authentication: AngularFireAuth, private router: Router, private cloudFirestore: AngularFirestore ) { }


  /** AUTENTICACIÓN FIREBASE */

  login(email:string, password: string){

    return this.authentication.signInWithEmailAndPassword(email, password);

  }

  crearUsuarioAuth(email: string, password: string){

    return this.authentication.createUserWithEmailAndPassword(email, password);
  }

  recuperarContraseña(email: string){
    return this.authentication.sendPasswordResetEmail(email);
  }


  /** CLOUD FIRESTORE */
  guardarCliente(cliente: FormGroup){

    
    
    let data: DatosCliente = {
      nombre      : cliente.value.nombre,
      apellido    : cliente.value.apellido,
      edad        : cliente.value.edad, 
      fNacimiento : (cliente.value.fNacimiento).getTime(),
      dniPasaporte: cliente.value.dniPasaporte,
      pais        : cliente.value.pais[0].name,
      fIngreso    : (cliente.value.fIngreso).getTime(),
      fPartida    : (cliente.value.fPartida).getTime(),
      genero      : cliente.value.genero,
      email       : cliente.value.email,
      flag        : cliente.value.pais[0].flag
    };

    
    return this.cloudFirestore.collection("clientes").doc(data.dniPasaporte).set(data);

    
  }

  guardarPago(pagos: FormGroup){

    let data: Pagos = {
      nombre    : pagos.value.nombre,
      apellido  : pagos.value.apellido,
      fIngreso  : (pagos.value.fIngreso).getTime(),
      fPartida  : (pagos.value.fPartida).getTime(),
      importe   : pagos.value.importe,
      fPago     : pagos.value.fPago
    }


    // Guardar pago en CloudFirestore
    return this.cloudFirestore.collection('pagos').add(data);
  }

  obtenerPagos(){

    return this.cloudFirestore.collection('pagos').valueChanges();
    
  }

  guardarGasto(gastos: FormGroup){

    let data: Gastos = {
      nombre: gastos.value.nombre,
      motivo: gastos.value.motivo,
      fGasto: (gastos.value.fGasto).getTime(),
      importe: gastos.value.importe      
    }


    // Guardar pago en CloudFirestore
    return this.cloudFirestore.collection('gastos').add(data);
  }

  obtenerGastos(){
    return this.cloudFirestore.collection('gastos').valueChanges();
  }
  
  crearHabitacion(tipo: string, dato:Habitacion){

    if(tipo == 'matrimoniales'){
      
      return this.cloudFirestore.collection('habitaciones_matrimoniales').doc(dato.id).set(dato);

    } else {
      
      return this.cloudFirestore.collection('habitaciones_compartidas').doc(dato.id).set(dato);

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

    let date = (new Date()).getTime();

    if(tipo == 'matrimoniales'){
      return this.cloudFirestore.collection('camas_matrimoniales').add({
        id      : id_habitacion, 
        estado  : 'LIBRE',
        cliente : 'SIN ASIGNAR',
        fIngreso: date,
        fPartida: date,
      });

    } else {
      return this.cloudFirestore.collection('camas_compartidas').add({
        id      : id_habitacion, 
        estado  : 'LIBRE',
        cliente : 'SIN ASIGNAR',
        fIngreso: date,
        fPartida: date,
      });
    }

  }

  obtenerCamas(tipo:string){
    
    if(tipo == 'matrimoniales'){
      return this.cloudFirestore.collection('camas_matrimoniales').get();
    } else {
      return this.cloudFirestore.collection('camas_compartidas').get();
    }
  }

  verficiarID(id_hab: string){

    return this.cloudFirestore.collection('habitaciones_matrimoniales').doc(id_hab).get();

  }

  obtenerClientes(){

    return this.cloudFirestore.collection('clientes').get();

  }

  actualizarInfoCama(id: string, cliente: ListadoCliente, tipo_camas: string){

    // console.log(id, ' => ', cliente);

    return this.cloudFirestore.collection(tipo_camas).doc(id).update({
      estado: 'OCUPADA',
      cliente: cliente.cliente,
      fIngreso: cliente.fIngreso,
      fPartida: cliente.fPartida
    });
  }

  desocuparCama(id_cama: string, tipo_camas: string){

    let date = (new Date()).getTime();
    console.log(date);

    return this.cloudFirestore.collection(tipo_camas).doc(id_cama).update({
      estado: 'LIBRE',
      cliente: 'SIN ASIGNAR',
      fIngreso: date,
      fPartida: date
    });

  }

  eliminarCama(doc:string, coleccion: string){
    
    return this.cloudFirestore.collection(coleccion).doc(doc).delete();
  }

  eliminarHab(doc:string, coleccion: string){
    
    return this.cloudFirestore.collection(coleccion).doc(doc).delete();
  }

  

  


  

}
