import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

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
        label: 'Reporte',
        routerLink: 'reportes-diarios'
      }
  ];

  }

  showDialog() {
    this.display  = true;
  }

  desconectar(){
    
    this.router.navigate(['/login']);
  }

}
