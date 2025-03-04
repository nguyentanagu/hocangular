import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "../shared/header-layout/header-layout.component";
import { FormsModule} from '@angular/forms';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CurrencyPipe, UpperCasePipe, NgFor, NgIf,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nameBtn ='Click me!';

  clickMessage ='';

  bindingMessage ='';

  isVisible=false;

  products = [
    {id: 1, name: 'Blue De Chanel', price: 400000, image: 'assets/images/bleu_de_chanel.jpg'},
    {id: 2, name: 'Dior Sauvage', price: 500000, image: 'assets/images/dior_sauvage.jpg'},
    {id: 3, name: 'Labo', price: 600000, image: 'assets/images/labo.jpg'},
    {id: 4, name: 'Terre Hermes', price: 700000, image: 'assets/images/terre_d_hermes.jpg'},
  ];

  updateField(): void{
    console.log('Hello Tan');
  }

  handleClickMe(): void{
    this.clickMessage = 'Click me Hello Tan';
  }
}
