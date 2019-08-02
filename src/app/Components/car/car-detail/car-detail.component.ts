import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import UserService from 'src/app/Services/user.service';
import CarService from 'src/app/Services/car.service';
import { Car } from 'src/app/Models/car.model';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  public car: Car;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCar();
  }

  getCar() {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.carService.getCar(id).subscribe(
        (response) => {
          // console.log(response)
          if (response.status === 'success') {
            const car = new Car();
            car.setFromResource(response.car);
            this.car = car;
          } else {
            this.router.navigate(['inicio']);
          }
        },
        (error) => {
          // console.log(error);
          this.router.navigate(['inicio']);
        }
      );
    });
  }

}
