import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { AppComponent } from './app.component';
import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import{FormsModule,ReactiveFormsModule} from'@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @NgModule({
//     declarations: [
//       AppComponent,
//       NavbarComponent
//     ],
//     imports: [
//     ],
//     providers: [ 
//     ],
//     bootstrap: [AppComponent]
//   })
//   export class AppModule { }