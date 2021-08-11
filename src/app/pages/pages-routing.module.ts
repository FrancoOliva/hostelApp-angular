import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { MatrimonialesComponent } from './matrimoniales/matrimoniales.component';
import { CompartidasComponent } from './compartidas/compartidas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'registrar-clientes',
        component: RegistrarClienteComponent
      },
      {
        path: 'registrar-pagos',
        component: RegistrarPagoComponent
      },
      {
        path: 'registrar-gastos',
        component: RegistrarGastoComponent
      },
      {
        path: 'matrimoniales',
        component: MatrimonialesComponent
      },
      {
        path: 'compartidas',
        component: CompartidasComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
