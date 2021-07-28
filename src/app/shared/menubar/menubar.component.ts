import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] = [];
  display : boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
          label: 'Registrar',
          items: [
          {label: 'Clientes' },
          {label: 'Pagos'},
          {label: 'Gastos'}
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
          {label: 'Por día' },
          {label: 'Por mes'},
          {label: 'Por año'},
        ]
      }
  ];
  
  }

  

  showDialog() {
    this.display  = true;
  }

}
