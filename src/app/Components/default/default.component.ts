
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/Services/user.service';
import CarService from 'src/app/Services/car.service';
import { Car } from 'src/app/Models/car.model';
import Session from 'src/app/Models/session.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public title: string;
  public status: string;
  public statusOperation: string;

  private token: string;
  private identity: Session;

  public cars: Array<Car>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private carService: CarService
  ) {
    this.title = 'Inicio';
    this.status = 'init';
    this.statusOperation = 'init';
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    console.log('default.component cargado correctamente!!!');
    setTimeout(() => {
      this.requestCars();
    }, 150);
  }

  requestCars() {
    this.statusOperation = 'init';
    this.carService.getCars().subscribe(
      response => {
        // console.log('response in get cars', response);
        if (response.status === 'success') {
          if (response.cars && response.cars.length >= 1) {
            this.status = 'success';
            this.cars = response.cars.map((car: any) => {
              const x = new Car();
              x.setFromResource(car);
              return x;
            });
          } else {
            this.status = 'zero';
            // console.log("mis carros error", status, response.cars);
          }
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log('error in get cars', error);
      }
    );
  }

  gotoCar(id: number): void{
    // [routerLink] = "['coche', car.id]";
    if (this.token) {
      this.router.navigate(['coche', id])
    }
  }

  deleteCar(id: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.carService.delete(this.token, id).subscribe((response) => {
      console.log('success', response);
      if (response.status === 'success') {
        this.statusOperation = 'success';
        this.requestCars();
      } else {
        this.statusOperation = 'error';
      }
    }, (error) => {
      console.log('error', error);
    });
  }

}
