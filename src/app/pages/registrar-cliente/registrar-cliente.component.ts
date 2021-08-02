import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styles: [
  ]
})
export class RegistrarClienteComponent implements OnInit {

  date2!: Date;

  registroCliente: FormGroup = this.fb.group({
    nombre: ['', Validators.required ],
    apellido: ['', Validators.required ],
    edad: ['', Validators.required ],
    fNacimiento: ['', Validators.required ],
    dniPasaporte: ['', Validators.required ],
    nacionalidad: ['', Validators.required ],
    fIngreso: ['', Validators.required ],
    fPartida: ['', Validators.required ],
    sexo: ['', Validators.required ],
    email: ['', Validators.required ]
  });

  constructor( private fb: FormBuilder, private db: FirebaseService) { }

  ngOnInit(): void {

    

  }

  guardar(){   
    

    this.db.guardarCliente(this.registroCliente);
    
  }

}
