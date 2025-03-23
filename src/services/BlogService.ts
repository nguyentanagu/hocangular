import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseData } from "../app/shared/types/responseData";
import { BlogItem, ProductItems } from "../app/shared/types/productItem";

@Injectable({ providedIn: 'root'})
export class BlogService {
    constructor(private http: HttpClient){}

    getBlogs(): Observable<ResponseData<ProductItems[]>>{
        return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
    }

    detailBlog(id: number): Observable<ResponseData<ProductItems>>{
        return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }

    postBlog(blogItem: BlogItem): Observable<ResponseData<ProductItems>>{
        return this.http.post<any>(`https://ninedev-api.vercel.app/blogs`, blogItem);
    }

    deleteBlog(id: number): Observable<ResponseData<ProductItems>> {
        return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
      }
      loginBlog(email: string, password: string): Observable<ResponseData<{ token: string }>> {
        return this.http.post<ResponseData<{ token: string }>>(
          'https://ninedev-api.vercel.app/account/login',
          { email, password }
        );
      }
      
      

}