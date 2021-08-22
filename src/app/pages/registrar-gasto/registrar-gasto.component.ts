import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-registrar-gasto',
  templateUrl: './registrar-gasto.component.html',
  styles: [
  ]
})
export class RegistrarGastoComponent implements OnInit {

  registrarGasto: FormGroup = this.fb.group({
    nombre:  ['' , Validators.required ],
    motivo:  ['' , Validators.required ],
    fGasto:  ['' , Validators.required ],
    importe: [ 0 , [ Validators.required, Validators.min(0) ] ]
  });

  constructor( private fb: FormBuilder, private db: FirebaseService, private messageService: MessageService ) { }

  ngOnInit(): void {
  }

  guardar(){

    if(this.registrarGasto.invalid){
      // Si quieren registrar un gasto y el formulario es invalido, arrojamos mensaje de error
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo registrar el gasto. Verificar información.'});
      this.registrarGasto.markAllAsTouched();

      return;
    }    

    // Mensajes de error u ok para el usuario una vez que se guarda la información en firestore database
    this.db.guardarGasto(this.registrarGasto).then((docRef) => {

      this.messageService.add({severity:'success', summary: 'Gasto registrado', detail: 'Gasto registrado y guardado con éxito.'});

    }).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Error inesperado: cartel de error con la información
      this.messageService.add({severity:'error', summary: errorCode, detail: errorMessage});
    });

    this.registrarGasto.reset();

    
  }

}
