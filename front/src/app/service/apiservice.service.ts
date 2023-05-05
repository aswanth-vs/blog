import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}
  searchTerm = new BehaviorSubject('');

  BASE_URL = 'http://localhost:3000';

  //for token verification
  appendToken() {
    let token = localStorage.getItem('token');
    //create http header
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('verify-token', token);
      options.headers = headers;
    }
    return options;
  }

  register(name: any, username: any, password: any) {
    const body = {
      name,
      username,
      password,
    };
    return this.http.post(`${this.BASE_URL}/home/register`, body);
  }

  login(username: any, password: any) {
    const body = {
      username,
      password,
    };
    return this.http.post(`${this.BASE_URL}/home/login`, body);
  }

  createPost(username: any, blog: any) {
    const body = {
      author: username,
      title: blog.title,
      banner: {
        name: blog.banner.name,
        data: blog.banner.data,
      },
      content: {
        text: blog.content.text,
        images: blog.content.images,
      },
    };
    return this.http.post(
      `${this.BASE_URL}/home/create-post`,
      body,
      this.appendToken()
    );
  }
}
