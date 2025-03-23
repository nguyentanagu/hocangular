import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { BlogService } from '../../services/BlogService';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductItemComponent, NgIf, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent implements OnInit, OnDestroy {
  nameBtn = 'Click Me!';
  clickMessage = '';
  bindingMessage = '';
  isVisible = true;
  getBlogApi: Subscription;

  products: ProductItems[] = [
    { id: 1, name: 'Blue De Chanel', price: 400000, image: 'assets/images/bleu_de_chanel.jpg' },
    { id: 2, name: 'Dior Sauvage', price: 500000, image: 'assets/images/dior_sauvage.jpg' },
    { id: 3, name: 'Labo', price: 600000, image: 'assets/images/labo.jpg' },
    { id: 4, name: 'Terre Hermes', price: 700000, image: 'assets/images/terre_d_hermes.jpg' },
  ];

  constructor(private blogService: BlogService, private router: Router) { 
    console.log('Initialize Component');
    this.getBlogApi = new Subscription();
  }

  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) =>
          data
            .map((item: any) => {
              return {
                ...item,
                name: item.title,
                price: Number(item.body),
                image: 'assets/images/bleu_de_chanel.jpg',
              };
            })
            .filter((product) => product.price > 100000)
        )
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi unsubscribed');
    }
  }

  handleClickMe(): void {
    this.clickMessage = 'Click Me Hello World';
  }

  updateField(): void {
    console.log('Hello Tan');
  }

  handleDelete = (id: number) => {
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == 1) {
        this.products = this.products.filter((item) => item.id !== id);
      }
    });
  };

  handleChangeVisible = () => {
    this.isVisible = false;
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
