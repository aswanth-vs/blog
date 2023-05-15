import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
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
  finishLoading: Boolean = false;
  showTags: Boolean = false;
  tags: any = [
    { id: 1, name: 'Food', code: 'ANG' },
    { id: 2, name: 'Travel', code: 'NOD' },
    { id: 3, name: 'News', code: 'REA' },
    { id: 4, name: 'Technology', code: 'VUE' },
    { id: 5, name: 'Science', code: 'JQU' },
    { id: 6, name: 'Lifestyle', code: 'ANG' },
    { id: 7, name: 'Music', code: 'NOD' },
    { id: 8, name: 'Sports', code: 'REA' },
    { id: 9, name: 'Finance', code: 'VUE' },
    { id: 10, name: 'Politics', code: 'JQU' },
    { id: 11, name: 'Business', code: 'ANG' },
    { id: 12, name: 'Art', code: 'NOD' },
    { id: 13, name: 'Culture', code: 'REA' },
    { id: 14, name: 'Religion', code: 'VUE' },
    { id: 15, name: 'Health and Fitness', code: 'JQU' },
  ];

  constructor(private api: ApiserviceService, private fb: FormBuilder) {}

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
      this.finishLoading = true;
    });
  }

  myForm = this.fb.group({
    tag: this.fb.array([]),
    temp: [''],
  });

  showFilter() {
    this.showTags = !this.showTags;
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

  // checkbox
  controlOnChange(event: any) {
    const tags: FormArray = this.myForm.get('tag') as FormArray;

    if (event.target.checked) {
      tags.push(new FormControl(event.target.value));
      // this.selectedCheckBoxList.push(event.target.value);
    } else {
      const index = tags.controls.findIndex(
        (tag) => tag.value === event.target.value
      );
      tags.removeAt(index);
    }
  }
}
