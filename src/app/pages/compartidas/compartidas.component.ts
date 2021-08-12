import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camas, Habitacion } from '../../interfaces/habitacion.interface';

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
    id: ['', Validators.required ],
    nombre: ['', Validators.required ]
  });

  listadoHabitaciones: Habitacion[] = [];
  listadoCamasCompartidas: Camas[] = [];

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  showBasicDialog(){

    this.display = true;
    console.log('Mostrar display');
  }

  crearHabitacion(){

    console.log('Crear habitación');

    this.display = false;

    

  }

  verCamas(){
    console.log('Mostrar camas');
    
  }
  crearCamas(){
    console.log('Crear camas');
    
  }

}
