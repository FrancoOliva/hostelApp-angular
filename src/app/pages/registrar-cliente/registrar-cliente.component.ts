import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

  constructor( private fb: FormBuilder, private db: FirebaseService, private paises: PaisesService, private messageService: MessageService ) {

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

  registrarCliente(){    
    
    
    if( this.registroCliente.invalid ){

      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se puede registrar el cliente, falta información.'});
      this.registroCliente.markAllAsTouched();
      
      return;

    } else {
            
      this.db.guardarCliente(this.registroCliente).then( (docRef) =>{
        
        this.messageService.add({severity:'success', summary: 'Datos OK', detail: 'Cliente registrado y guardado en la base de datos.'});
        
      }).catch((error) => {
        this.messageService.add({severity:'error', summary: error.code, detail: error.message});
      });
    }

    this.registroCliente.reset();
    
    
  }

}
