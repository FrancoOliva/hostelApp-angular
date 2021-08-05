import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor( private fb: FormBuilder, private db: FirebaseService ) { }

  ngOnInit(): void {
  }

  guardar(){

    if(this.registrarGasto.invalid){
      console.log('El formulario es invalido. Verificar campos incompletos.');
      return;
    }

    this.db.guardarGasto(this.registrarGasto);
  }

}
