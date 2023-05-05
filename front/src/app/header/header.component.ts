// import { Component } from '@angular/core';

import {
  Component,
  HostListener,
  Directive,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  scrolled: boolean = false;

  //to add box shadow to the nav bar when scrolling
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }
}
