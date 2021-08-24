import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Camas, Habitacion } from '../../interfaces/habitacion.interface';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styles: [
    `
    .click{
      cursor: pointer;
    },
    .centrar-texto{
      text-align: center;
    }
    `
  ]
})
export class CompartidasComponent implements OnInit {

  display: boolean = false;

  display1: boolean = false;


  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required ],
    nombre: ['', Validators.required ]
  });

  camaForm: FormGroup = this.fb.group({
    id_hab: new FormControl({ value: '', disabled: true}),
    estado: new FormControl({ value: '', disabled: true}),
    cliente: new FormControl({ value: '', disabled: true}),
    fIngreso: new FormControl({ value: '', disabled: true}),
    fPartida: new FormControl({ value: '', disabled: true})
  });

  listadoHabitaciones: Habitacion[] = [];
  listadoCamasCompartidas: Camas[] = [];

  mensaje: string = 'No hay camas creadas.';

  mostrarCamas: Camas[] = [];

  constructor( private fb: FormBuilder, private db: FirebaseService, private messageService: MessageService ) { }

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

    let existe: boolean = false;

    if( this.habitacionForm.invalid ){

      this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar información. No se pudo crear la habitación.'});
      this.habitacionForm.markAllAsTouched();
      return;
    }

    const dato: Habitacion = {
      id: this.habitacionForm.value.id,
      nombre: this.habitacionForm.value.nombre,
      srcImg: 'assets/camaDoble3.png',
      mostrarCamas: false
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

      this.db.crearHabitacion( 'compartidas', dato ).then(() => {

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
    
    this.mostrarCamas = [];

    for( let i = 0; i < this.listadoCamasCompartidas.length; i++){

      if(this.listadoCamasCompartidas[i].id = habitacion_id){

        this.mostrarCamas.push(this.listadoCamasCompartidas[i]);

      }

    }

    if( this.mostrarCamas.length < 18 ){

      this.mostrarCamas = [];
      this.mensaje = 'Haga click en ver camas otra vez por favor.'
      
      
      this.db.crearCamas('compartidas', habitacion_id).then((doc) => {
        
        this.messageService.add({severity:'success', summary: 'Cama creada', detail: 'Cama creada y registrada en la base de datos.'});
        
      }).catch((error) =>{
        
        this.messageService.add({severity:'error', summary: error.code, detail: error.message});

      });

    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Máximo de camas alcanzado.'});
    }
    
  }

  infoCama(index_cama: number){
    this.display1 = true;

    console.log('Información cama ', index_cama);
    
  }

  ocupar(){

    console.log('Desplegar lista de clientes registrados para ocupar la cama');
  }

  desocupar(){
    console.log('Liberar cama');
  }

}
