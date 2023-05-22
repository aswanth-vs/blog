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
  selectedTags: any = [];
  filteredPosts: any = [];
  searchKey: any = '';

  // _filterText: string = '';

  // get filterText() {
  //   return this._filterText;
  // }

  // set filterText(value: string) {
  //   this._filterText = value;
  // }
  tags: any = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Travel' },
    { id: 3, name: 'News' },
    { id: 4, name: 'Technology' },
    { id: 5, name: 'Science' },
    { id: 6, name: 'Lifestyle' },
    { id: 7, name: 'Music' },
    { id: 8, name: 'Sports' },
    { id: 9, name: 'Finance' },
    { id: 10, name: 'Politics' },
    { id: 11, name: 'Business' },
    { id: 12, name: 'Art' },
    { id: 13, name: 'Culture' },
    { id: 14, name: 'Religion' },
    { id: 15, name: 'Health and Fitness' },
  ];

  searchFilters: any = [
    {
      name: 'Food',
      selected: false,
    },
    {
      name: 'Travel',
      selected: false,
    },
    {
      name: 'News',
      selected: false,
    },
    {
      name: 'Technology',
      selected: false,
    },
    {
      name: 'Science',
      selected: false,
    },
    {
      name: 'Lifestyle',
      selected: false,
    },
    {
      name: 'Music',
      selected: false,
    },
    {
      name: 'Sports',
      selected: false,
    },
    {
      name: 'Finance',
      selected: false,
    },

    {
      name: 'Business',
      selected: false,
    },
    {
      name: 'Art',
      selected: false,
    },

    {
      name: 'Health and Fitness',
      selected: false,
    },
  ];

  // backup
  // searchFilters: any = [
  //   {
  //     name: 'Food',
  //     selected: false,
  //   },
  //   {
  //     name: 'Travel',
  //     selected: false,
  //   },
  //   {
  //     name: 'News',
  //     selected: false,
  //   },
  //   {
  //     name: 'Technology',
  //     selected: false,
  //   },
  //   {
  //     name: 'Science',
  //     selected: false,
  //   },
  //   {
  //     name: 'Lifestyle',
  //     selected: false,
  //   },
  //   {
  //     name: 'Music',
  //     selected: false,
  //   },
  //   {
  //     name: 'Sports',
  //     selected: false,
  //   },
  //   {
  //     name: 'Finance',
  //     selected: false,
  //   },
  //   {
  //     name: 'Politics',
  //     selected: false,
  //   },
  //   {
  //     name: 'Business',
  //     selected: false,
  //   },
  //   {
  //     name: 'Art',
  //     selected: false,
  //   },
  //   {
  //     name: 'Culture',
  //     selected: false,
  //   },
  //   {
  //     name: 'Religion',
  //     selected: false,
  //   },
  //   {
  //     name: 'Health and Fitness',
  //     selected: false,
  //   },
  // ];

  constructor(private api: ApiserviceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.api.searchTerm.subscribe((result: any) => {
      if (result) {
        this.searchTerm = result;
        console.log(result);
        this.searchFilters.forEach((tag: any) => {
          if (tag.name == result) {
            tag.selected = true;
          }
        });
        this.showFilter();
        this.applyFilter();
      }
    });

    this.api.getPost().subscribe((data: any) => {
      console.log('Testing inside getPost');
      console.log(data);
      this.allPosts = data;
      this.finishLoading = true;
      this.searchBlog();
    });
  }

  showFilter() {
    this.showTags = !this.showTags;
  }

  applyFilter() {
    this.selectedTags = [];
    this.searchFilters.forEach((i: any) => {
      if (i.selected) {
        !this.selectedTags.includes(i.name) && this.selectedTags.push(i.name);
      }
    });
    console.log(this.selectedTags);
    this.searchBlog();
  }

  searchBlog() {
    // console.log(this._filterText);
    // return;
    this.filteredPosts = [];
    let flag: any = 0;
    if (this.searchKey == '') {
      console.log('Inside Empty');

      this.filteredPosts = this.allPosts.filter((post: any) => {
        return this.selectedTags.every((tag: any) => {
          return post.tags.includes(tag);
        });
      });

      // this.allPosts.forEach((post: any) => {
      //   let validPost = this.selectedTags.every((tag: any) => {
      //     return post.tags.includes(tag);
      //   });
      //   if (validPost) {
      //     this.filteredPosts.push(post);
      //   }
      // });
    } else {
      for (const post of this.allPosts) {
        let string = post.title.trim().split(' ').join(' ').toLowerCase();
        // console.log(this.searchKey.trim().split(' ').join(' ').toLowerCase());

        if (
          string.includes(
            this.searchKey.trim().split(' ').join(' ').toLowerCase()
          )
        ) {
          console.log(post.title);

          for (const tag of this.selectedTags) {
            if (!post.tags.includes(tag)) {
              flag = 1;
            }
          }
          flag == 0 && this.filteredPosts.push(post);
        }
      }
    }
    console.log(this.filteredPosts);
  }

  // checkbox
  // controlOnChange(event: any) {
  //   const tags: FormArray = this.myForm.get('tag') as FormArray;

  //   if (event.target.checked) {
  //     tags.push(new FormControl(event.target.value));
  //     // this.selectedTag.push(event.target.value);
  //   } else {
  //     const index = tags.controls.findIndex(
  //       (tag) => tag.value === event.target.value
  //     );
  //     tags.removeAt(index);
  //   }
  // }
}
