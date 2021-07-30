import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';

const routes: Routes = [
  {
    path: 'inicio',
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
