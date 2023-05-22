import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  // hasProfilepicture:boolean = false;
  constructor(
    private accountRouter: Router,
    private api: ApiserviceService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username') || '';
    }
    if (localStorage.getItem('avatar')) {
      this.avatarURL = localStorage.getItem('avatar') || '';
    }
    if (!localStorage.getItem('token')) {
      alert('Please Login');
      this.accountRouter.navigateByUrl('login');
    } else {
      if (localStorage.getItem('admin')) {
        this.adminLoggedIn = true;
        console.log('Admin');
        this.getAllPosts();
      } else {
        this.adminLoggedIn = false;
        console.log('User');
        this.getUserPosts();
      }
    }
  }
  username: any = '';
  allPosts: any = [];
  avatarURL: any = '';
  finishLoading: boolean = false;
  statusShowPosts: boolean = true;
  statusDeletePosts: boolean = false;
  statusDeletePostsConfirm: boolean = false;
  adminLoggedIn: boolean = false;
  // to hold ID and Title of the post to be deleted
  deletePostID: any = '';
  deletePostTitle: any = '';

  //get user posts
  getAllPosts() {
    this.api.getPost().subscribe((data: any) => {
      this.allPosts = data;
      console.log(this.allPosts);
      this.finishLoading = true;
    });
  }

  //admin get all posts
  getUserPosts() {
    this.api.viewUserPosts(this.username).subscribe((data: any) => {
      this.allPosts = data;
      console.log(this.allPosts);
      this.finishLoading = true;
    });
  }

  //toggle all post section
  showPosts() {
    if (this.statusShowPosts) {
      return;
    } else {
      this.statusShowPosts = true;
      this.statusDeletePosts = false;
    }
  }

  // toggle the delete post section
  deletePostShow() {
    if (this.statusDeletePosts) {
      return;
    } else {
      this.statusShowPosts = false;
      this.statusDeletePosts = true;
    }
  }

  deletePostInit(id: any, title: any) {
    this.statusDeletePostsConfirm = true;
    this.deletePostID = id;
    this.deletePostTitle = title;
  }

  confirmPostDeletion() {
    this.api.deletePost(this.deletePostID).subscribe(
      //200
      (data: any) => {
        console.log(data);
        this.finishLoading = false;
        if (localStorage.getItem('admin')) {
          this.getAllPosts();
        } else {
          this.getUserPosts;
        }
      },
      //400
      (data: any) => {
        console.log(data.error);
      }
    );
  }

  // deletePostConfirm(id: any) {
  //   console.log(id);
  // }

  // deletePostCancel() {
  //   this.statusDeletePostsConfirm = false;
  // }
}
