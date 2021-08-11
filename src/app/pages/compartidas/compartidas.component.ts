import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion } from '../../interfaces/habitacion.interface';

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styles: [
    `
    p-accordion {
      width: 450px;
    }
    `
  ]
})
export class CompartidasComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['HCA1', Validators.required ],
    nombre: ['Habitación Compartida A1', Validators.required ]
  });

  listadoHabitaciones: Habitacion[] = [];

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  showBasicDialog(){

    this.display = true;
    console.log('Mostrar display');
  }

  crearHabitacion(){

    this.listadoHabitaciones.push({
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      estado: 'libre',
      srcImg: 'assets/camaDoble3.png',
      mostrarCamas: false,
      camas: []
    });

    this.display = false;

    console.log(this.listadoHabitaciones);

  }

  verCamas(i: number){
    console.log('Mostrar camas');
    this.listadoHabitaciones[i].mostrarCamas = true;
  }
  crearCamas(i: number){
    console.log('Crear camas');
    this.listadoHabitaciones[i].camas.push({
      estado: 'Sin ocupar',
      cliente: 'Sin asignar',
      fIngreso: new Date(),
      fPartida: new Date()
    });
  }

}
