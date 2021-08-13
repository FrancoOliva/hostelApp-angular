import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camas, Habitacion } from '../../interfaces/habitacion.interface';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styles: [
    `
    p-accordion {
      width: 450px;
    }
    `
  ]
})
export class CompartidasComponent implements OnInit {

  display: boolean = false;

  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required ],
    nombre: ['', Validators.required ]
  });

  listadoHabitaciones: Habitacion[] = [];
  listadoCamasCompartidas: Camas[] = [];

  mensaje: string = 'No hay camas creadas.';

  mostrarCamas: Camas[] = [];

  constructor( private fb: FormBuilder, private db: FirebaseService ) { }

  ngOnInit(): void {

    this.db.obtenerHabitaciones('compartidas').subscribe((querySnapshot) => {

      // Limpiamos el arreglo para evitar errores
      // cuando creamos una habitación nueva
      this.listadoHabitaciones = [];
      
      querySnapshot.forEach((doc) => {
        
        this.listadoHabitaciones.push(doc);

      })
      
    });

    this.db.obtenerCamas('compartidas').subscribe((querySnapshot) =>{

      this.listadoCamasCompartidas = [];

      querySnapshot.forEach((doc) => {
        
        this.listadoCamasCompartidas.push(doc);

      });
      
    });


  }

  showBasicDialog(){

    this.display = true;
    
  }

  crearHabitacion(){

    if( this.habitacionForm.invalid ){

      console.log('Completar datos de la habitación.');
      return;
    }

    const dato: Habitacion = {
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      srcImg: 'assets/camaDoble3.png',
      mostrarCamas: false
    }

    this.db.crearHabitacion('compartidas', dato);

    this.habitacionForm.reset();

    this.display = false;

    

  }

  verCamas(habitacion_id: string){
    
    // Nos aseguramos que este arreglo siempre este limpio
    // antes de agregarle camas
    this.mostrarCamas = [];

    // recupera todas las camas de la db
    // llena el arreglo mostrarCamas
    // para mostrar solo las camas de habitacion_id 
    for(let i = 0; i < this.listadoCamasCompartidas.length; i++){
      if( this.listadoCamasCompartidas[i].id == habitacion_id ){
        this.mostrarCamas.push(this.listadoCamasCompartidas[i]);
      } else {
        this.mensaje = 'No hay camas creadas.';
      }
    }

    // modifica a true o false para ver las camas de la habitación seleccionada
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

    this.db.crearCamas('compartidas', habitacion_id);
    
  }

}
