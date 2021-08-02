import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
   

  items: MenuItem[] = [];
  display : boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
          label: 'Registrar',
          items: [
          {
            label: 'Clientes',
            routerLink: 'registrar-clientes' },
          {
            label: 'Pagos',
            routerLink: 'registrar-pagos'
          },
          {
            label: 'Gastos',
            routerLink: 'registrar-pagos'}
        ]
      },
      {
        label: 'Habitaciones',
        items: [
          {label: 'Matrimoniales' },
          {label: 'Compartidas'},
        ]
      },
      {
        label: 'Reportes',
        items: [
          {label: 'Por día' }
        ]
      }
  ];

  }

  showDialog() {
    this.display  = true;
  }

}
