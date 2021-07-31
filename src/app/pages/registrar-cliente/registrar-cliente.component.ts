import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styles: [
  ]
})
export class RegistrarClienteComponent implements OnInit {

  registrarCliente: FormGroup = this.fb.group({
    nombre: [''],
    apellido: [''],
    edad: [''],
    fNacimiento: [''],
    dniPasaporte: [''],
    nacionalidad: [''],
    fIngreso: [''],
    fPartida: [''],
    sexo: [''],
    email: [''],
    importe: [''],
    formaPago: ['']
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  guardar(){
    console.log('Guardar cliente en Cloud Firestore');
  }

}
