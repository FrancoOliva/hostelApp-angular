import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

  constructor( private fb: FormBuilder, private db: FirebaseService, private messageService: MessageService ) {
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

  regPago(){

    if(this.registrarPago.invalid){
      
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo registrar el pago. Verificar información.'});
      this.registrarPago.markAllAsTouched();
      return;
    } else {

      // Pasamos el formulario completado como parámetro
    this.db.guardarPago(this.registrarPago).then((docRef) => {

      this.messageService.add({severity:'success', summary: 'Datos Ok', detail: 'Pago registrado y guardado con éxito.'});

    }).catch((error) =>{

      this.messageService.add({severity:'error', summary: error.code, detail: error.message });
    });

    }    

    this.registrarPago.reset();
    
  }


}
