import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "../shared/header-layout/header-layout.component";
import { FormsModule} from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { map, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductItemComponent, NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit ,OnDestroy {
  nameBtn ='Click me!';

  clickMessage ='';

  bindingMessage ='';

  isVisible=true;


  getBlogApi: Subscription;

  products: ProductItems[] = [
    {id: 1, name: 'Blue De Chanel', price: 400000, image: 'assets/images/bleu_de_chanel.jpg'},
    {id: 2, name: 'Dior Sauvage', price: 500000, image: 'assets/images/dior_sauvage.jpg'},
    {id: 3, name: 'Labo', price: 600000, image: 'assets/images/labo.jpg'},
    {id: 4, name: 'Terre Hermes', price: 700000, image: 'assets/images/terre_d_hermes.jpg'},
  ];

  constructor(private blogService: BlogService) {
    console.log('Initalize Component');
    this.getBlogApi= new Subscription();
    
  }

  ngOnInit():void{
    console.log('Initalized Component');
    this.getBlogApi= this.blogService.getBlogs().pipe(
      map(({ data }) =>
        data.map((item: any) =>{
          return{
            ...item,
            name: item.title,
            price: Number(item.body),
            image: 'assets/images/terre_d_hermes.jpg',
          };  
         }).filter(product =>product.price > 400000)
      ),
    ).subscribe((res)=> {
       this.products = res;

      });
  }

  
  ngOnDestroy(): void {
    if(this.getBlogApi){
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi Unsubscribe');
    }
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
