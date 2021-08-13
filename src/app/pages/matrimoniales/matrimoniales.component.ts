import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { Camas } from '../../interfaces/habitacion.interface';

import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-matrimoniales',
  templateUrl: './matrimoniales.component.html',
  styles: [
    `
    p-accordion {
      width: 450px;
    }
    `
  ]
})
export class MatrimonialesComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    nombre: ['' , Validators.required ]
  });

  listadoHabitaciones: Habitacion[] =  [];
  listadoCamasMatrimoniales: Camas[] = [];

  mensaje: string = 'No hay camas creadas.';

  mostrarCamas: Camas[] = [];  

  constructor( private fb: FormBuilder, private db: FirebaseService ) {

    
    
   }

  ngOnInit(): void {

    this.db.obtenerHabitaciones('matrimoniales').subscribe((querySnapshot) => {

      // Limpiamos el arreglo para evitar errores
      // cuando creamos una habitación nueva
      this.listadoHabitaciones = [];
      
      querySnapshot.forEach((doc) => {
        
        this.listadoHabitaciones.push(doc);

      })
      
    });

    this.db.obtenerCamas('matrimoniales').subscribe((querySnapshot) =>{

      this.listadoCamasMatrimoniales = [];

      querySnapshot.forEach((doc) => {
        
        this.listadoCamasMatrimoniales.push(doc);

      });
      
    });

    
  }

  showBasicDialog(){
    this.display = true;
  }

  /** CREAR HABITACIONES / CAMAS  */

  crearHabitacion(){

    if( this.habitacionForm.invalid ){

      console.log('Completar datos de la habitación.');
      return;
    }

    const dato: Habitacion = {
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      srcImg: 'assets/camaDoble3.png',
      mostrarCamas: false
    }

    this.db.crearHabitacion('matrimoniales', dato);

    this.habitacionForm.reset();
       
    this.display = false;

    
  }

  verCamas(habitacion_id: string){

    // Nos aseguramos que este arreglo siempre este limpio
    // antes de agregarle camas
    this.mostrarCamas = [];

    for(let i = 0; i < this.listadoCamasMatrimoniales.length; i++){
      if( this.listadoCamasMatrimoniales[i].id == habitacion_id ){
        this.mostrarCamas.push(this.listadoCamasMatrimoniales[i]);
      } else {
        this.mensaje = 'No hay camas creadas.';
      }
    }

    for(let i = 0; i < this.listadoHabitaciones.length; i++){
      if( this.listadoHabitaciones[i].id == habitacion_id ){
        this.listadoHabitaciones[i].mostrarCamas = true;
      } else {
        this.listadoHabitaciones[i].mostrarCamas = false;
      }
    }  

  }

  crearCamas(habitacion_id: string){

    this.mostrarCamas = []
    this.mensaje = 'Haga click en ver camas otra vez por favor.'

    this.db.crearCamas('matrimoniales',habitacion_id);    

  }


}
