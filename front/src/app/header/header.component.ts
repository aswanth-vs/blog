// import { Component } from '@angular/core';

import {
  Component,
  HostListener,
  Directive,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
  }

  loggedIn: Boolean = false;
  scrolled: boolean = false;

  //to add box shadow to the nav bar when scrolling
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    setTimeout(() => {
      window.location.reload();
      this.router.navigateByUrl('');
    }, 1000);
  }
}
