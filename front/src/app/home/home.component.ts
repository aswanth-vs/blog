import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private api: ApiserviceService) {
    console.log('Testing');

    this.api.getPost().subscribe((data: any) => {
      console.log('Testing inside getPost');
      console.log(data);
      this.allPosts = data;
    });
  }

  allPosts: any = [];

  ngOnInit() {}
  redirectToSearch(text: any) {
    console.log(text);
    if (text) {
      this.router.navigateByUrl('home/search');
      this.api.searchTerm.next(text);
    }
  }
}
