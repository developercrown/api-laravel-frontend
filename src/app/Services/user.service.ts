import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import {User} from '../Models/user.model';
import Session from 'src/app/Models/session.model';

@Injectable()
export default class UserService{
  private url: string;
  public identity: Session;
  public token: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    const json = JSON.stringify(user); // Convierte un objeto a un string
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'register', params, {headers});
  }

  signup(user: User, getToken: boolean = false): Observable<any> {
    if (getToken) {
      user.gettoken = true;
    } else {
      user.gettoken = false;
    }
    const json = JSON.stringify(user); // Convierte un objeto a un string
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'login', params, {headers});
  }

  getIdentity(): Session{
    const data = JSON.parse(localStorage.getItem('identity'));

    if (data) {
      this.identity = new Session(data);
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken(): string{
    const data = localStorage.getItem('token');
    if (data) {
      this.token = data;
    } else {
      this.token = null;
    }
    return this.token;
  }

}
