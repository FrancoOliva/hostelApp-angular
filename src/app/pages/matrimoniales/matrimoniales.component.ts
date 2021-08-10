import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-matrimoniales',
  templateUrl: './matrimoniales.component.html',
  styles: [   ]
})
export class MatrimonialesComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['HMA1', Validators.required],
    nombre: ['Habitación Matrimonial A1' , Validators.required ]
  });

  habitacionesM: Habitacion[] = [  ];

  constructor( private fb: FormBuilder, private db: FirebaseService ) {

    
    
   }

  ngOnInit(): void {

    console.log(this.habitacionesM);

    
  }

  showBasicDialog(){
    this.display = true;
  }

  crearHabitacion(){

    this.habitacionesM.push({
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      estado: 'libre',
      srcImg: 'assets/camaDoble3.png',
      camas: [],
      mostrarCamas: false
    });

    
    this.habitacionForm.reset();
    
    this.display = false;
  }

  verCamas(habID: string){
    console.log('Mostrar camas', habID);

    for(let i = 0; i < this.habitacionesM.length; i++){

      if( this.habitacionesM[i].id == habID ){
        this.habitacionesM[i].mostrarCamas = true;
      } else {
        this.habitacionesM[i].mostrarCamas = false;
      }
    }
  }

  crearCamas(habID: string){
    console.log('Crear camas', habID);

    for(let i = 0; i < this.habitacionesM.length; i++){

      if( this.habitacionesM[i].id == habID ){
        this.habitacionesM[i].camas.push(
          {
          estado: 'ocupada',
          cliente: 'Franco Oliva',
          fIngreso: new Date(),
          fPartida: new Date()
        },
        {
          estado: 'ocupada',
          cliente: 'Franco Perez',
          fIngreso: new Date(),
          fPartida: new Date()
        },
        {
          estado: 'ocupada',
          cliente: 'Franco Paz',
          fIngreso: new Date(),
          fPartida: new Date()
        })
      } else {
        console.log('La cama no se creo en la habitación seleccionada. Ver!');
      }
      
    }
  }


}
