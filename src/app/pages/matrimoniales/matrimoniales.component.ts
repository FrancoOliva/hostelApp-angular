import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';

@Component({
  selector: 'app-matrimoniales',
  templateUrl: './matrimoniales.component.html',
  styles: [
    `
    .habitacion{
      cursor: pointer;
    }
    `
  ]
})
export class MatrimonialesComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    nombre: ['' , Validators.required ],
    cantidadCamas: [ null , [ Validators.required, Validators.min(0)] ]
  });

  habitacionesM: Habitacion[] = [  ];

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {

    
  }

  showBasicDialog(){
    this.display = true;
  }

  crearHabitacion(){

    this.habitacionesM.push({
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      estado: 'libre',
      srcImg: 'assets/camaDoble3.png'
    });

    console.log(this.habitacionesM);
    this.habitacionForm.reset();
    
    this.display = false;
  }

  mostrarCamas(habID: string){
    console.log('Mostrar camas', habID);
  }


}
