import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  // to create a false click event on the modal close button after the image has been selected
  // @ViewChild('closebutton')
  // closebutton!: ElementRef<HTMLElement>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private api: ApiserviceService,
    private router: Router
  ) {}

  bannerimageSrc: string = '';
  bannerimageName: string = '';
  urlFile: string = '';
  images: any = [];
  currentUser: any = '';
  testing: string = '';
  tagsFinal: any = [];

  myForm = this.fb.group({
    title: [''],
    content: [''],
    file: [''],
    tag: this.fb.array([]),
    temp: [''],
  });

  // tags: any = [
  //   { id: 1, name: 'Food', code: 'ANG' },
  //   { id: 2, name: 'Travel', code: 'NOD' },
  //   { id: 3, name: 'News', code: 'REA' },
  //   { id: 4, name: 'Technology', code: 'VUE' },
  //   { id: 5, name: 'Science', code: 'JQU' },
  //   { id: 6, name: 'Lifestyle', code: 'ANG' },
  //   { id: 7, name: 'Music', code: 'NOD' },
  //   { id: 8, name: 'Sports', code: 'REA' },
  //   { id: 9, name: 'Finance', code: 'VUE' },
  //   { id: 10, name: 'Politics', code: 'JQU' },
  //   { id: 11, name: 'Business', code: 'ANG' },
  //   { id: 12, name: 'Art', code: 'NOD' },
  //   { id: 13, name: 'Culture', code: 'REA' },
  //   { id: 14, name: 'Religion', code: 'VUE' },
  //   { id: 15, name: 'Health and Fitness', code: 'JQU' },
  // ];

  tags: any = [
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

  content: any = '';
  textarea: any = '';
  test: any = '';

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('Please Login');
      this.router.navigateByUrl('login');
    }
    if (localStorage.getItem('username')) {
      this.currentUser = localStorage.getItem('username') || '';
    }
  }

  // get f() {
  //   return this.myForm.controls;
  // }

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

  uploadBannerImage(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.bannerimageName = file.name;
      console.log('File: ', file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.bannerimageSrc = reader.result as string;
        // console.log(reader.result);
      };
    }
  }

  uploadImage(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const filename = file.name;
      console.log(filename);

      // console.log('File: ', file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.images.push({
          name: filename,
          image: reader.result as string,
        });
        // this.testing = reader.result as string;
      };

      this.textarea += `<|${file.name}|>`;
      // this.test += `<br />[${file.name}]`;
    }
    // console.log(this.images);
  }

  urlUpload(event: any) {
    // console.log(event.value);
    this.bannerimageSrc = event.value;
  }

  submitBlog() {
    console.log(this.myForm.value.tag);

    if (this.myForm.valid) {
      this.myForm.value.tag?.forEach((tag: any) => {
        this.tagsFinal.push(tag);
      });
      this.content = this.myForm.value.content;
      this.content = this.content.replace(/\n/g, '<br />');
      this.test = this.content;
      console.log('testing', this.content);
      let selectedTags: any = [];
      this.tags.forEach((i: any) => {
        if (i.selected) {
          !selectedTags.includes(i.name) && selectedTags.push(i.name);
        }
      });
      console.log(selectedTags);

      if (selectedTags.length < 1) {
        alert('Select at Least One Tag');
        return;
      }
      const blog = {
        title: this.myForm.value.title,
        banner: {
          name: this.bannerimageName,
          data: this.bannerimageSrc,
        },
        content: {
          text: this.myForm.value.content,
          images: this.images,
        },
        tags: selectedTags,
      };
      console.log(blog);

      this.api.createPost(this.currentUser, blog).subscribe(
        (result: any) => {
          alert('Posted');
          this.clearAll();
        },
        // 400
        (result: any) => {
          alert(result.error);
          // console.log(result.error);
        }
      );
      // console.log(blog);
    } else {
      alert('Please fill out all fields');
    }
  }

  clearAll() {
    this.myForm.reset();
    this.bannerimageSrc = '';
    this.bannerimageName = '';
    this.tags.forEach((tag: any) => {
      tag.selected = false;
    });
    // this.urlFile = '';
  }

  doNothing() {}
}
