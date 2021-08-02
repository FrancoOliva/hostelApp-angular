import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ],
  exports:[
    MenubarModule,
    ButtonModule,
    DialogModule,
    DividerModule,
    CardModule,
    InputTextModule,
    CalendarModule
  ]
})
export class PrimeNgModule { }
