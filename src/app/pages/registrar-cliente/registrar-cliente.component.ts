import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/pais/pais.interface';
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

   }

  ngOnInit(): void {

    this.paises.obtenerPaises().subscribe( paises => {
      this.listaPaises = paises;
      console.log(this.listaPaises)
    });
    
    
  }

  guardar(){   
    

    this.db.guardarCliente(this.registroCliente);
    
  }

}
