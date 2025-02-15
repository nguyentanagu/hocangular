import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from "./shared/header-layout/header-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //text
  title = {
    name:'NguyenTan',
    old:'22',
  };
  //properties
  isDisable=false;

  //Attributes
  contenImage='Tan Nguyen Chao';
}
