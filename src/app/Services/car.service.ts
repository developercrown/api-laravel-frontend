import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import Session from '../Models/session.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../Models/car.model';
import { Observable } from 'rxjs';

@Injectable()
export default class CarService{
  private url: string;
  private identity: Session;
  private token: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  test() {
    console.log('CarService has been loaded successfully!');
    return 'data from test in car service';
  }

  create(token: string, car: Car): Observable<any> {
    const json = JSON.stringify(car);
    const params = 'json=' + json;
    // console.log(token);

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);

      console.log(headers);

    return this.http.post(this.url + "cars", params, { headers: headers });
  }
}
