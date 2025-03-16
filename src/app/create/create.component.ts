import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BlogService } from '../../services/BlogService';
import { ProductItems } from '../shared/types/productItem';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { NgIf } from '@angular/common';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../app.component.css'],
})
export class CreateComponent  {
   name = new FormControl('');
    price = new FormControl('');

  constructor(private blogService: BlogService) { }

  handleAddtoCart() {
    console.log(this.name.value);
    console.log(this.price.value);
  }
}
