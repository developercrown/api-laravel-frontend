import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import UserService from 'src/app/Services/user.service';
import Session from 'src/app/Models/session.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public token: string;
  public identity: Session;
  public status: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = 'Identificate';
    this.status = 'init';
    this.init();
  }

  ngOnInit() {
    console.log('Login component cargado');
    this.logout();
  }

  setRejectState(){
    this.status = 'reject';
  }

  onSubmit(form: any) {
    console.log(this.user);
    this.userService.signup(this.user).subscribe(
      (response: any) => {
        // Token
        console.log('token', response);
        if (
          response.status === 'success' &&
          response.data &&
          response.data.status === 'success'
        ) {
          this.userService.signup(this.user, true).subscribe(
            (subresponse: any) => {
              console.log('success-user', subresponse);
              if (
                subresponse.status === 'success' &&
                subresponse.data &&
                subresponse.data.status === 'success'
              ) {
                this.token = response.data.data;
                this.identity = new Session(subresponse.data.data);

                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this.router.navigate(['inicio']);
              } else {
                console.log('error sublogin');
                this.init();
                this.clear();
                this.setRejectState();
              }
            },
            suberror => {
              console.log('suberror', suberror);
              this.init();
              this.clear();
              this.setRejectState();
            }
          );
        } else {
          console.log('error login');
          this.init();
          this.clear();
          this.setRejectState();
        }
      },
      error => {
        console.log('error', error);
        this.init();
        this.clear();
        this.setRejectState();
      }
    );
  }

  init() {
    this.user = new User();
    this.token = null;
    this.identity = null;
  }

  clear() {
    // localStorage.clear(); // Remueve todos los objetos de localStorage
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
  }

  logout(): void {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const logout = +params["sure"];

      if (logout === 1) {
        this.clear();
        this.token = null;
        this.identity = null;

        // Redirección
        this.router.navigate(["inicio"]);
      }
    });
  }
}
