import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import UserService from 'src/app/Services/user.service';
import CarService from 'src/app/Services/car.service';
import { Car } from 'src/app/Models/car.model';
import Session from 'src/app/Models/session.model';
@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  public pageTitle: string;
  public car: Car;
  private identity: Session;
  private token: string;
  public statusCar: string;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.car = new Car();
    this.pageTitle = 'Editando Vehiculo';
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getCar(id);
    });
  }

  getCar(id: number) {
      this.carService.getCar(id).subscribe(
        response => {
          // console.log(response)
          if (response.status === 'success') {
            const car = new Car();
            car.setFromResource(response.car);
            this.car = car;
            this.pageTitle = 'Editar Vehiculo: ' + this.car.title;
            console.log('carro obtenido', this.car);
          } else {
            this.router.navigate(['inicio']);
          }
        },
        error => {
          // console.log(error);
          this.router.navigate(['inicio']);
        }
      );
  }

  onSubmit(form: any): void {
    console.log(this.car);
    // console.log(this.carService.test());
    this.carService.update(this.token, this.car, this.car.id).subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.car = response.car;
          this.statusCar = 'success';
          form.reset();
          this.router.navigate(['/coche', this.car.id]);
        } else {
          this.statusCar = 'error';
        }
      },
      error => {
        console.log(error);
        this.statusCar = 'error';
      }
    );
  }
}
