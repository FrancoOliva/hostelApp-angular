import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ],
  exports:[
    MenubarModule,
    ButtonModule,
    DialogModule
  ]
})
export class PrimeNgModule { }
