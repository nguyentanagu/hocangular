import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "../shared/header-layout/header-layout.component";
import { FormsModule} from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductItemComponent, NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  nameBtn ='Click me!';

  clickMessage ='';

  bindingMessage ='';

  isVisible=true;

  products: ProductItems[] = [
    {id: 1, name: 'Blue De Chanel', price: 400000, image: 'assets/images/bleu_de_chanel.jpg'},
    {id: 2, name: 'Dior Sauvage', price: 500000, image: 'assets/images/dior_sauvage.jpg'},
    {id: 3, name: 'Labo', price: 600000, image: 'assets/images/labo.jpg'},
    {id: 4, name: 'Terre Hermes', price: 700000, image: 'assets/images/terre_d_hermes.jpg'},
  ];

  constructor(private http: HttpClient) {
    console.log('Initalize Component');
    
  }

  ngOnInit():void{
    console.log('Initalized Component');
    this.http.get<any>('https://ninedev-api.vercel.app/blogs')
      .subscribe(({data,message})=> {
       this.products =data.map((item: any) =>{
        return{
          ...item,
          name: item.title,
          price: Number(item.body),
          image: 'assets/images/terre_d_hermes.jpg',
        };  
       });

      });
  }

  updateField(): void{
    console.log('Hello Tan');
  }

  handleDelete =  (id:number)  =>{
   
    this.products =this.products.filter((item) =>item.id !==id)
  }

  handleChangeVisible =() =>{
    this.isVisible = false;
  }

  handleClickMe(): void{
    this.clickMessage = 'Click me Hello Tan';
  }
}
