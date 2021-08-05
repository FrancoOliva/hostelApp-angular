import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/interfaces/pais.interface';

import { FirebaseService } from '../../servicios/firebase.service';
import { PaisesService } from '../../servicios/paises.service';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styles: [
  ]
})
export class RegistrarClienteComponent implements OnInit {

  date2!: Date;
  genero: any[];

  listaPaises: Pais[] = [];

  registroCliente: FormGroup = this.fb.group({
    nombre: ['', Validators.required ],
    apellido: ['', Validators.required ],
    edad: ['', Validators.required ],
    fNacimiento: ['', Validators.required ],
    dniPasaporte: ['', Validators.required ],
    pais: ['', Validators.required ],
    fIngreso: ['', Validators.required ],
    fPartida: ['', Validators.required ],
    genero: ['', Validators.required ],
    email: ['', Validators.required ]
  });

  constructor( private fb: FormBuilder, private db: FirebaseService, private paises: PaisesService ) {

    this.genero = [
      {
        label: 'Femenino', value: 'Femenino'
      },
      {
        label: 'Masculino', value: 'Masculino'
      }
    ]

    this.paises.obtenerPaises().subscribe( paises => {
      this.listaPaises = paises;

    });

   }

  ngOnInit(): void {
    
    
  }

  guardar(){ 
    
    
    
    if( this.registroCliente.invalid){

      console.log('Se intento crear un cliente sin completar el formulario');
      console.log(this.registroCliente.status);
      return;

    } else {
      
      console.log('Formulario completo');
      this.registroCliente.status

      // mandamos el formulario a la DB
      this.db.guardarCliente(this.registroCliente);
    }
    
    
  }

}
