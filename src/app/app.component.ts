import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "./shared/header-layout/header-layout.component";
import { FormsModule} from '@angular/forms';
import { CurrencyPipe } from './shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from './shared/pipes/UpperCasePipe.pipe';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderLayoutComponent,FormsModule, CurrencyPipe, UpperCasePipe, NgFor, NgIf ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nameBtn ='Click me!';

  clickMessage ='';

  bindingMessage ='';

  isVisible=false;

  products = [
    { name: 'Blue De Chanel', price: 400000, image: 'assets/images/bleu_de_chanel.jpg'},
    { name: 'Dior Sauvage', price: 500000, image: 'assets/images/dior_sauvage.jpg'},
    { name: 'Labo', price: 600000, image: 'assets/images/labo.jpg'},
    { name: 'Terre Hermes', price: 700000, image: 'assets/images/terre_d_hermes.jpg'},
  ];

  updateField(): void{
    console.log('Hello Tan');
  }

  handleClickMe(): void{
    this.clickMessage = 'Click me Hello Tan';
  }
}
