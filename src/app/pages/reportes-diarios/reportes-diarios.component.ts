import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { ListadoCliente } from '../compartidas/compartidas.component';

@Component({
  selector: 'app-reportes-diarios',
  templateUrl: './reportes-diarios.component.html',
  styles: [
  ]
})
export class ReportesDiariosComponent implements OnInit {


  clientes: any[] = [];
  pagos: any[] = [];
  gastos: any[] = [];

  mostrarMensaje: boolean = true;

  

  constructor( private db: FirebaseService ) { }

  ngOnInit(): void {


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

      this.mostrarMensaje = false;

    });

    this.db.obtenerPagos().subscribe( (querySnapshot) => {

      this.pagos = [];

      querySnapshot.forEach((doc) => {
        
        let data : any = doc;

        this.pagos.push({
          cliente: data.nombre + ' ' + data.apellido,
          fIngreso: data.fIngreso,
          fPartida: data.fPartida,
          fPago: data.fPago,
          importe: data.importe
        });

      });

      console.log(this.pagos);

    });

    this.db.obtenerPagos().subscribe( (querySnapshot) => {

      this.pagos = [];

      querySnapshot.forEach((doc) => {
        
        let data : any = doc;

        this.pagos.push({
          cliente: data.nombre + ' ' + data.apellido,
          fIngreso: data.fIngreso,
          fPartida: data.fPartida,
          fPago: data.fPago,
          importe: data.importe
        });

      });

      console.log(this.pagos);

    });

    this.db.obtenerGastos().subscribe( (querySnapshot) => {

      this.gastos = [];

      querySnapshot.forEach((doc) => {
        
        let data : any = doc;

        this.gastos.push({
          nombre: data.nombre,
          fGasto: data.fGasto,
          motivo: data.motivo,
          importe: data.importe
        });

      });

      console.log(this.pagos);

    });

    

  }

}
