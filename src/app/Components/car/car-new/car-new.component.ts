import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/Services/user.service';
import { Car } from 'src/app/Models/car.model';
import Session from 'src/app/Models/session.model';
import CarService from 'src/app/Services/car.service';

@Component({
  selector: "app-car-new",
  templateUrl: "./car-new.component.html",
  styleUrls: ["./car-new.component.scss"]
})
export class CarNewComponent implements OnInit {
  public pageTitle: string;
  public status: string;
  public car: Car;
  private identity: Session;
  private token: string;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageTitle = "Crear nuevo coche";
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    if (this.identity == null) {
      this.router.navigate(["/login"]);
    } else {
      // Crear objeto coche
      this.car = new Car();
    }
  }

  onSubmit(form: any): void {
    console.log(this.car);
    // console.log(this.carService.test());
    this.carService.create(this.token, this.car).subscribe(
      (response) => {
        console.log(response);
        // this.car = response.car;
      },
      (error) => {
        console.log(error);
      });
  }
}
