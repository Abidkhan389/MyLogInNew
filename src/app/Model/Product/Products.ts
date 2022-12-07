export class Products{
  id:number;
  name:string;
  description:string;
  price:number;
  imageUrl:string;
  constructor(id=0,name='',description='',price=0,imageUrl='https://blogs.mathworks.com/cleve/files/Simulating_blog_04.png'){
    this.id=id
    this.name=name
    this.description=description
    this.price=price
    this.imageUrl=imageUrl
  }
}
