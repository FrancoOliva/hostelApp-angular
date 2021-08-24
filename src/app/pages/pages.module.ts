import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { RegistrarGastoComponent } from './registrar-gasto/registrar-gasto.component';
import { RegistrarPagoComponent } from './registrar-pago/registrar-pago.component';
import { HomeComponent } from './home/home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrimonialesComponent } from './matrimoniales/matrimoniales.component';
import { CompartidasComponent } from './compartidas/compartidas.component';
import { ReportesDiariosComponent } from './reportes-diarios/reportes-diarios.component';




@NgModule({
  declarations: [
    HomeComponent,
    RegistrarClienteComponent,
    RegistrarGastoComponent,
    RegistrarPagoComponent,
    MatrimonialesComponent,
    CompartidasComponent,
    ReportesDiariosComponent,
    
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    RegistrarClienteComponent,
    RegistrarGastoComponent,
    RegistrarPagoComponent
  ]
})
export class PagesModule { }
