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
            routerLink: 'registrar-gastos'
          }
        ]
      },
      {
        label: 'Habitaciones',
        items: [
          {
            label: 'Matrimoniales',
            routerLink: 'matrimoniales'
          },
          {
            label: 'Compartidas',
            routerLink: 'compartidas'
          }
        ]
      },
      {
        label: 'Reportes',
        items: [
          {
            label: 'Por día',
            routerLink: 'reportes-diarios'
          }
        ]
      }
  ];

  }

  showDialog() {
    this.display  = true;
  }

}
