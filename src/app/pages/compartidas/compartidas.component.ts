import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Camas, Habitacion } from '../../interfaces/habitacion.interface';
import { FirebaseService } from '../../servicios/firebase.service';

export interface ListadoCliente {
  cliente: string,
  nacionalidad: string,
  fIngreso: string
  fPartida: string
}

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

  display2: boolean = false;

  clientes: ListadoCliente[] = [];


  habitacionForm: FormGroup = this.fb.group({
    id: ['', Validators.required ],
    nombre: ['', Validators.required ]
  });

  id_cama_doc: any = '';
  id_hab: string = ''; 

  listadoHabitaciones: Habitacion[] = [];
  listadoCamasCompartidas: Camas[] = [];

  mensaje: string = 'No hay camas creadas.';

  mostrarCamas: Camas[] = [];
  camaSeleccionada: Camas[] = [];

  constructor( private fb: FormBuilder, private db: FirebaseService, private messageService: MessageService ) { }

  ngOnInit(): void {

    this.db.obtenerHabitaciones('compartidas').subscribe((querySnapshot) => {

      // Limpiamos el arreglo para evitar errores
      // cuando creamos una habitación nueva
      this.listadoHabitaciones = [];
      
      querySnapshot.forEach((doc) => {
        
        this.listadoHabitaciones.push(doc);

      })

      console.log('recuperamos habitaciones');
      
    });

    this.db.obtenerCamas('compartidas').subscribe((querySnapshot) =>{

      this.listadoCamasCompartidas = [];

      querySnapshot.forEach((doc) => {        

        let data : any = {
          id_doc: doc.id,
          info: doc.data()
        }
        
        this.listadoCamasCompartidas.push({
          id_doc: doc.id,
          id: data.info.id,
          estado: data.info.estado,
          cliente: data.info.cliente,
          fIngreso: data.info.fIngreso,
          fPartida: data.info.fPartida
        }); 

      }); 
      
      console.log('recuperamos camas');
      
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

        this.db.obtenerCamas('compartidas').subscribe((querySnapshot) =>{

          this.listadoCamasCompartidas = [];
    
          querySnapshot.forEach((doc) => {        
    
            let data : any = {
              id_doc: doc.id,
              info: doc.data()
            }
            
            this.listadoCamasCompartidas.push({
              id_doc: doc.id,
              id: data.info.id,
              estado: data.info.estado,
              cliente: data.info.cliente,
              fIngreso: data.info.fIngreso,
              fPartida: data.info.fPartida
            });        
    
          });      
          
        });
        
      }).catch((error) =>{
        
        this.messageService.add({severity:'error', summary: error.code, detail: error.message});

      });

    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Máximo de camas alcanzado.'});
    }
    
  }

  infoCama(index_cama: number){

    this.camaSeleccionada = [];

    //console.log(this.mostrarCamas[index_cama].id_doc);

    this.id_cama_doc = this.mostrarCamas[index_cama].id_doc;

    this.camaSeleccionada.push(this.mostrarCamas[index_cama]);    

    this.display1 = true;
    
  }

  ocupar(){

    this.display2 = true;

    this.db.obtenerClientes().subscribe((querySnapshot) => {

      this.clientes = [];

      querySnapshot.forEach((doc) => {

        let data : any = doc.data();

        this.clientes.push(
          {
            cliente: data.nombre + ' ' + data.apellido,
            nacionalidad: data.pais,
            fIngreso: data.fIngreso,
            fPartida: data.fPartida
          }
        );

      });

    });

    
  }

  desocupar(){
    console.log('Liberar cama');
  }

  seleccionarCliente(clientes: ListadoCliente){
    let id: string = this.id_cama_doc;
    let cliente: ListadoCliente = clientes;
    
    // actualizar cama en firebase
    this.db.actualizarInfoCama(id, cliente).then((doc) => {

      
      this.messageService.add({severity:'success', summary: 'Datos OK', detail: 'Información de la cama actualizada en la base de datos.'});

      this.camaSeleccionada[0] = {
        id : this.camaSeleccionada[0].id,
        estado: 'OCUPADA',
        cliente: cliente.cliente,
        fIngreso: cliente.fIngreso,
        fPartida: cliente.fPartida
      };



      this.db.obtenerCamas('camas_compartidas').subscribe((camas) =>{

        this.listadoCamasCompartidas = [];
      
        camas.forEach((doc) => {        

          let data : any = {
            id_doc: doc.id,
            info: doc.data()
          }
          
          this.listadoCamasCompartidas.push({
            id_doc: doc.id,
            id: data.info.id,
            estado: data.info.estado,
            cliente: data.info.cliente,
            fIngreso: data.info.fIngreso,
            fPartida: data.info.fPartida
          });          

        });

        
        // Como recuperamos todas las camas de la db de nuevo
        // vaciamos 'mostrarCamas[]' para llenarlo otra vez con las camas que concidan sus ID's
        this.mostrarCamas = [];
        
        for(let i = 0; i < this.listadoCamasCompartidas.length; i++){
          if( this.listadoCamasCompartidas[i].id == this.camaSeleccionada[0].id ){
            this.mostrarCamas.push(this.listadoCamasCompartidas[i]);
          }
        }

      });
      

    }).catch((error) => {
      console.log(error.code);
      console.log(error.message);

      this.messageService.add({severity:'error', summary: error.code, detail: error.message});
    });

    this.display2 = false;
    this.id_cama_doc = '';
  }

  

}
