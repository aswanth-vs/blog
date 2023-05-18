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
  constructor(private http: HttpClient) {
    // this.getPost().subscribe((data: any) => {
    //   console.log('Testing inside getPost');
    //   console.log(data);
    //   this.allPosts.next(data);
    // });
  }
  searchTerm = new BehaviorSubject('');

  // allPosts = new BehaviorSubject([]);

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
      tags: blog.tags,
    };
    return this.http.post(
      `${this.BASE_URL}/home/create-post`,
      body,
      this.appendToken()
    );
  }

  //get all posts
  getPost() {
    return this.http.get(`${this.BASE_URL}/home/all-posts`);
  }

  //view post
  viewpost(id: any) {
    return this.http.get(`${this.BASE_URL}/home/view-post/${id}`);
  }

  viewUserPosts(username: any) {
    return this.http.get(
      `${this.BASE_URL}/home/all-posts/${username}`,
      this.appendToken()
    );
  }

  deletePost(id: any) {
    // const body = {
    //   uniqueId: id,
    // };
    return this.http.delete(
      `${this.BASE_URL}/home/delete-post/${id}`,
      this.appendToken()
    );
  }

  adminLogin(username: any, password: any) {
    const body = {
      username,
      password,
    };
    return this.http.post(`${this.BASE_URL}/home/admin`, body);
  }
}
