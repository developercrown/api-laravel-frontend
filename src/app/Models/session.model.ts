export default class Session{
  public sub: string;
  public email: string;
  public name: string;
  public surname: string;
  public iat: string;
  public exp: string;

  constructor(session=null){
    if (session) {
      this.sub = session.sub;
      this.email = session.email;
      this.name = session.name;
      this.surname = session.surname;
      this.iat = session.iat;
      this.exp = session.exp;
    }
  }

  setAll(
    sub: string = null,
    email: string = null,
    name: string = null,
    surname: string = null,
    iat: string = null, // Timestamp de la creacion
    exp: string  = null// Timestamp de expiración
  ) {
    this.sub = sub;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.iat = iat;
    this.exp = exp;
  }
}
