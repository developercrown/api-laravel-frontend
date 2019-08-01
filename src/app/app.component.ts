import { Component, OnInit, DoCheck } from '@angular/core';
import UserService from './Services/user.service';
import Session from './Models/session.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  public identity: Session;
  public token: string;

  title = 'api-frontend';

  constructor(private userService: UserService) {
    this.updateSession();
  }

  updateSession() {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void { // Cuando el componente se carga ejecuta la funcion
    console.log('app-component cargado');
    // console.log('data', this.token, this.identity);
  }

  ngDoCheck(): void { // Se encarga de que cada vez que hay un cambio a nivel de componente ejecuta la funcion
    this.updateSession();
  }
}
