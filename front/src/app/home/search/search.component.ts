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

  constructor(private api: ApiserviceService) {}

  ngOnInit(): void {
    this.api.searchTerm.subscribe((result: any) => {
      this.searchTerm = result;
      console.log(result);
      if (result) {
        this.showResults = true;
      }
    });
  }

  searchBlog(text: any) {
    if (text) {
      this.searchTerm = text;
      this.showResults = true;
    }
  }
}
