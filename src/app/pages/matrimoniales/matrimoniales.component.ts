import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-matrimoniales',
  templateUrl: './matrimoniales.component.html',
  styles: [
  ]
})
export class MatrimonialesComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    nombre: ['Habitación ejemplo', Validators.required ],
    cantidadCamas: [1, [ Validators.required, Validators.min(0)] ]
  })  

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  showBasicDialog(){
    this.display = true;
  }

  crearHabitacion(){

    console.log(this.habitacionForm.value);
    
    this.display = false;
  }


}
