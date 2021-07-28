import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';




@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ],
  exports:[
    MenubarModule,
    ButtonModule
  ]
})
export class PrimeNgModule { }
