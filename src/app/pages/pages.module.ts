import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { HomeComponent } from './home/home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RegistrarClienteComponent,
    RegistrarGastoComponent,
    RegistrarPagoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    RegistrarClienteComponent,
    RegistrarGastoComponent,
    RegistrarPagoComponent
  ]
})
export class PagesModule { }
