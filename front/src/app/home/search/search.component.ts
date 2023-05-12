import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  showResults: Boolean = false;
  allPosts: any = [];
  currentPosts: any = [];

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {
    this.api.searchTerm.subscribe((result: any) => {
      this.searchTerm = result;
      console.log(result);
      if (result) {
        this.showResults = true;
        this.searchBlog(result);
      }
    });

    this.api.getPost().subscribe((data: any) => {
      console.log('Testing inside getPost');
      console.log(data);
      this.allPosts = data;
    });
  }

  searchBlog(text: any) {
    if (text) {
      this.currentPosts = [];
      this.searchTerm = text;
      this.showResults = true;
      this.allPosts.forEach((post: any) => {
        if (
          post.title
            .trim()
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        ) {
          this.currentPosts.push(post);
        }
      });
    }
  }
}
