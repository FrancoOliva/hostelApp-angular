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
  

  mensaje: string = 'No existe ninguna habitación creada.';

  constructor( private fb: FormBuilder, private db: FirebaseService ) {

    
    
   }

  ngOnInit(): void {

    
    
  }

  showBasicDialog(){
    this.display = true;
  }

  /** CREAR HABITACIONES / CAMAS  */

  crearHabitacion(){

     this.listadoHabitaciones.push({
       id: this.habitacionForm.value.id,
       nombre: this.habitacionForm.value.nombre,
       estado: 'libre',
       srcImg: 'assets/camaDoble3.png',
       mostrarCamas: false,
       camas: []
     });
    
    //this.habitacionForm.reset();    
    this.display = false;

    
  }

  verCamas(index: number){

    this.listadoHabitaciones[index].mostrarCamas = true;    

  }

  crearCamas(index: number){
       

     this.listadoHabitaciones[index].camas.push({
       estado: 'Sin ocupar',
       cliente: 'Sin asignar',
       fIngreso: new Date(),
       fPartida: new Date()
     });

    // console.log(this.listadoHabitaciones[index].camas);

    

  }


}
