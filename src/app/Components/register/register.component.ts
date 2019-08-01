import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/user.model';
import UserService from 'src/app/Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.title = 'Registrate';
    this.status = 'init';
    this.user = new User();
  }

  ngOnInit() {
    console.log('registro cargado correctamente!!!');
  }

  onSubmit(form) {
    // console.log(this.user);
    this.userService.register(this.user).subscribe(
      (response: any) => {
        if (response.status === 'success') {

          // Vaciar el formulario
          this.user = new User();
          form.reset();
          this.status = 'success';
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log('error', error);
      }
    );
  }

}
