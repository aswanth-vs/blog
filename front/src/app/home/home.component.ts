import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../service/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private api: ApiserviceService) {}
  redirectToSearch(text: any) {
    console.log(text);
    if (text) {
      this.router.navigateByUrl('home/search');
      this.api.searchTerm.next(text);
    }
  }
}
