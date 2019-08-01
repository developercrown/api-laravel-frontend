export class Car {

  constructor(
    public id: number = 1,
    public title: string = null,
    public description: string = null,
    public price: number = 1,
    public status: string = null,
    public createdAt: string = null,
    public updatedAt: string = null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
