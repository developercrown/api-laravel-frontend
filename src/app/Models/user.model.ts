export class User{

  constructor(
    public id: number = 0,
    public role: string = 'UNKNOWN',
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public gettoken: boolean = null
  ) {
    this.id = id;
    this.role = role;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.gettoken = gettoken;
  }

  setFromResource(user: any){
    this.id = user.id;
    this.role = user.role;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
  }

}
