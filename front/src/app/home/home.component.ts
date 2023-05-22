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

  count: any = 0;
  showGroup1: Boolean = false;
  showGroup2: Boolean = false;
  showGroup3: Boolean = false;
  showGroup4: Boolean = false;
  // showGroup5: Boolean = false;

  group1: any = [];
  group2: any = [];
  group3: any = [];
  group4: any = [];

  group1tags: any = ['Food', 'Lifestyle', 'Health and Fitness'];
  group2tags: any = ['Travel', 'Music', 'Art'];
  group3tags: any = ['News', 'Technology', 'Science'];
  group4tags: any = ['Sports', 'Finance', 'Business'];

  @HostListener('window:scroll', [])
  onScroll(): void {
    //makes it so that the categories are not shown before they are loaded
    if (this.bottomReached()) {
      this.count++;
      console.log(this.count);
      // window.scroll(0, 0);
      if (this.count > 0) {
        this.showGroup1 = true;
      }
      if (this.count > 1) {
        this.showGroup2 = true;
      }
      if (this.count > 2) {
        this.showGroup3 = true;
      }
      if (this.count > 3) {
        this.showGroup4 = true;
      }
    }
  }

  // @HostListener('click', ['$event'])
  // onClick(event: any) {
  //   if (event.target.id == 'redirect_Search') {
  //     console.log(event.target.innerHTML);

  //     this.api.searchTerm.next(event.target.innerHTML);
  //   }
  // }
  gotoSearch(event: any) {
    let temp = event.target.innerHTML.trim();
    this.api.searchTerm.next(temp);
  }

  // test(text: any) {
  //   this.api.searchTerm.next(text);
  // }

  bottomReached(): boolean {
    return (
      window.innerHeight + window.scrollY * 1.1 >= document.body.offsetHeight
    );
  }

  allPosts: any = [];
  //to show that the data is being loaded
  finishLoading: Boolean = false;
  // to show featured posr
  featuredLoading: Boolean = false;
  featuredIndex: any = 0;
  featuredPost: any = [];

  ngOnInit() {
    console.log('Testing');
    // scroll to the top
    window.scroll(0, 0);

    this.api.getPost().subscribe((data: any) => {
      console.log('Testing inside getPost');
      console.log(data);
      this.allPosts = data;
      this.sortingPostsIntoGroups();
      //
      this.finishLoading = true;
      this.featuredIndex = Math.floor(
        Math.random() * (this.allPosts.length - 1)
      );
      this.featuredPost = this.allPosts[this.featuredIndex];
      // console.log(this.featuredPost);
      console.log(this.group1);
      console.log(this.group2);
      console.log(this.group3);
      console.log(this.group4);
      this.featuredLoading = true;
    });
  }
  redirectToSearch(text: any) {
    // console.log(event.target.innerHTML);

    this.router.navigateByUrl('home/search');
    this.api.searchTerm.next(text);
  }

  sortingPostsIntoGroups() {
    this.allPosts.forEach((post: any) => {
      this.group1tags.forEach((tag: any) => {
        if (
          post.tags.includes(tag) &&
          !this.group1.includes(post) &&
          this.group1.length < 3
        ) {
          this.group1.push(post);
        }
      });
    });

    this.allPosts.forEach((post: any) => {
      this.group2tags.forEach((tag: any) => {
        if (
          post.tags.includes(tag) &&
          !this.group2.includes(post) &&
          this.group2.length < 3
        ) {
          this.group2.push(post);
        }
      });
    });

    this.allPosts.forEach((post: any) => {
      this.group3tags.forEach((tag: any) => {
        if (
          post.tags.includes(tag) &&
          !this.group3.includes(post) &&
          this.group3.length < 3
        ) {
          this.group3.push(post);
        }
      });
    });

    this.allPosts.forEach((post: any) => {
      this.group4tags.forEach((tag: any) => {
        if (
          post.tags.includes(tag) &&
          !this.group4.includes(post) &&
          this.group4.length < 3
        ) {
          this.group4.push(post);
        }
      });
    });
  }
}
