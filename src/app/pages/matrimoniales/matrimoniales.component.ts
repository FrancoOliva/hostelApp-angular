import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { Camas } from '../../interfaces/habitacion.interface';

import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-matrimoniales',
  templateUrl: './matrimoniales.component.html',
  styles: [
    `
    p-accordion {
      width: 450px;
    }
    `
  ]
})
export class MatrimonialesComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    nombre: ['' , Validators.required ]
  });

  listadoHabitaciones: Habitacion[] =  [];
  listadoCamasMatrimoniales: Camas[] = [];

  mensaje: string = 'No hay camas creadas.';

  mostrarCamas: Camas[] = [];  

  constructor( private fb: FormBuilder, private db: FirebaseService, private messageService: MessageService ) {

    
    
   }

  ngOnInit(): void {    

    this.db.obtenerHabitaciones('matrimoniales').subscribe((querySnapshot) => {

      // Limpiamos el arreglo para evitar errores
      // cuando creamos una habitación nueva
      this.listadoHabitaciones = [];
      
      querySnapshot.forEach((doc) => {
        
        this.listadoHabitaciones.push(doc);

      })

      
      
    });

    this.db.obtenerCamas('matrimoniales').subscribe((querySnapshot) =>{

      // this.listadoCamasMatrimoniales = [];

      querySnapshot.forEach((doc) => {
        
        this.listadoCamasMatrimoniales.push(doc);

      });
      
    });

    
  }

  showBasicDialog(){
    this.display = true;
  }

  /** CREAR HABITACIONES / CAMAS  */

  crearHabitacion(){

    let existe: boolean = false;
 

    const dato: Habitacion = {
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      srcImg: 'assets/camaDoble3.png',
      mostrarCamas: false
    }    

    // Si el formulario es inválido no realizamos ninguna acción
    if( this.habitacionForm.invalid ){

      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se puede crear la habitación. Verificar información.'});
      this.habitacionForm.markAllAsTouched();
      return;
    }


    for( let i = 0; i < this.listadoHabitaciones.length; i++){

      // Si el ID ingresado coincide con el ID de alguna de las habitaciones
      // modificamos el valor de 'existe'
      if(this.listadoHabitaciones[i].id == dato.id ){       

        existe = true;

      }

    }
    
    // Si el ID existe muestra alerta y no crea nada en la base de datos
    // caso contrario, crea la habitación y la guarda en firebase
    if( existe == true ){
      
       this.messageService.add({severity:'error', summary: 'Error', detail: 'Ya existe una habitación con ese ID.'});

    } else if( existe == false ){

      this.db.crearHabitacion( 'matrimoniales', dato ).then(() => {

        this.messageService.add({severity:'success', summary: 'Datos OK', detail: 'Habitación creada con éxito y guardada en la base de datos.'});

      }).catch((error) => {

        // alerta con el código de error y mensaje predefinido
        this.messageService.add({severity:'error', summary: error.code, detail: error.message });
      })

      this.habitacionForm.reset();
     
      this.display = false;   
      
    }

    
    
  }

  verCamas(habitacion_id: string){

    // Nos aseguramos que este arreglo siempre este limpio
    // antes de agregarle camas
    this.mostrarCamas = [];

    for(let i = 0; i < this.listadoCamasMatrimoniales.length; i++){
      if( this.listadoCamasMatrimoniales[i].id == habitacion_id ){
        this.mostrarCamas.push(this.listadoCamasMatrimoniales[i]);
      } else {
        this.mensaje = 'No hay camas creadas.';
      }
    }

    for(let i = 0; i < this.listadoHabitaciones.length; i++){
      if( this.listadoHabitaciones[i].id == habitacion_id ){
        this.listadoHabitaciones[i].mostrarCamas = true;
      } else {
        this.listadoHabitaciones[i].mostrarCamas = false;
      }
    }  

  }

  crearCamas(habitacion_id: string){

    this.mostrarCamas = []
    this.mensaje = 'Haga click en ver camas otra vez por favor.'

    this.db.crearCamas('matrimoniales',habitacion_id);    

  }


}
