import { User } from './user.model';

export class Car {

  constructor(
    public id: number = 1,
    public title: string = null,
    public description: string = null,
    public price: number = 1,
    public status: string = 'false',
    public user: User = null,
    public userId: number = null,
    public createdAt: string = null,
    public updatedAt: string = null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = status;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  setFromResource(object: any = null) {
    if (object) {
      this.id = object.id;
      this.title = object.title;
      this.description = object.description;
      this.price = object.price;
      this.status = object.status;
      if (object.user) {
        const user = new User();
        user.setFromResource(object.user);
        this.user = user;
      } else {
        this.user = null;
      }
      this.userId = object.user_id;
      this.createdAt = object.created_at;
      this.updatedAt = object.updated_at;
    }
  }

}
