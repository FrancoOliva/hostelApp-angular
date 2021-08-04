import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styles: [
  ]
})
export class RegistrarPagoComponent implements OnInit {

  fPago: any[];

  registrarPago: FormGroup = this.fb.group({
    nombre: ['', Validators.required ],
    apellido: ['', Validators.required ],
    fIngreso: ['', Validators.required ],
    fPartida: ['', Validators.required ],
    importe: [0, [ Validators.required, Validators.min(0) ] ],
    fPago: ['', Validators.required ]
  });

  constructor( private fb: FormBuilder, private db: FirebaseService ) {
    this.fPago = [
      {
        label: 'Efectivo', value: 'Efectivo'
      },
      {
        label: 'Tarjeta de Crédito', value: 'TC'
      }
    ]
   }

  ngOnInit(): void {
  }

  guardar(){

    console.log(this.registrarPago.value);

    // Pasamos el formulario completado como parámetro
    this.db.guardarPago(this.registrarPago);

    this.registrarPago.reset();
  }


}
