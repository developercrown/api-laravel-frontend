import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import UserService from './Services/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DefaultComponent } from './Components/default/default.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CarNewComponent } from './Components/car/car-new/car-new.component';
import { CarEditComponent } from './Components/car/car-edit/car-edit.component';
import { CarDetailComponent } from './Components/car/car-detail/car-detail.component';
import CarService from './Services/car.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    NotFoundComponent,
    CarNewComponent,
    CarEditComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
