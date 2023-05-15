import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private api: ApiserviceService) {}

  allPosts: any = [];
  //to show that the data is being loaded
  finishLoading: Boolean = false;
  // to show featured posr
  featuredLoading: Boolean = false;
  featuredIndex: any = 0;
  featuredPost: any = [];

  ngOnInit() {
    console.log('Testing');

    this.api.getPost().subscribe((data: any) => {
      console.log('Testing inside getPost');
      console.log(data);
      this.allPosts = data;
      this.finishLoading = true;
      this.featuredIndex = Math.floor(
        Math.random() * (this.allPosts.length - 1)
      );
      this.featuredPost = this.allPosts[this.featuredIndex];
      console.log(this.featuredPost);

      this.featuredLoading = true;
    });
  }
  redirectToSearch(text: any) {
    console.log(text);
    if (text) {
      this.router.navigateByUrl('home/search');
      this.api.searchTerm.next(text);
    }
  }
}
