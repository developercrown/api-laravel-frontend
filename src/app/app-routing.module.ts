import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components

import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DefaultComponent } from './Components/default/default.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CarNewComponent } from './Components/car/car-new/car-new.component';
import { CarEditComponent } from './Components/car/car-edit/car-edit.component';
import { CarDetailComponent } from './Components/car/car-detail/car-detail.component';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'inicio', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  { path: 'crear-coche', component: CarNewComponent},
  { path: 'editar-coche/:id', component: CarEditComponent},
  { path: 'coche/:id', component: CarDetailComponent},

  { path: '**', component: NotFoundComponent } // Ruta cuando no exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
