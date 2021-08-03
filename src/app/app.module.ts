import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

/** SUPER IMPORTANTE si queremos hacer peticiones HTTP a una API REST */
import { HttpClientModule } from '@angular/common/http';


/** Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';










@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule,
    AngularFirestoreModule
    

  ],
  providers: [
    AngularFireAuth,
    AngularFirestore

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
