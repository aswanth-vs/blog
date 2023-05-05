import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
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

  bannerimageSrc: string = '';
  bannerimageName: string = '';
  urlFile: string = '';
  images: any = [];
  currentUser: any = '';
  testing: string = '';

  myForm = this.fb.group({
    title: [''],
    content: [''],
    file: [''],
  });

  content: any = '';
  textarea: any = '';
  test: any = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private api: ApiserviceService,
    private router: Router
  ) {}
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

      // this.textarea += `(img:${file.name})`;
    }
  }

  uploadImage(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const filename = file.name;
      console.log(filename);

      console.log('File: ', file);

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.images.push({
          name: filename,
          image: reader.result as string,
        });
        // this.testing = reader.result as string;
      };

      this.textarea += `[${file.name}]`;
      // this.test += `<br />[${file.name}]`;
    }
    console.log(this.images);
  }

  urlUpload(event: any) {
    console.log(event.value);
    this.bannerimageSrc = event.value;
  }

  submitBlog() {
    if (this.myForm.valid) {
      // const date = new Date();
      // console.log('Date', date);

      console.log(this.myForm.value);
      this.content = this.myForm.value.content;
      this.content = this.content.replace(/\n/g, '<br />');
      this.test = this.content;
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
      };
      this.api.createPost(this.currentUser, blog).subscribe(
        (result: any) => {
          alert('Posted');
        },
        // 400
        (result: any) => {
          console.log(result.error);
        }
      );
      console.log(blog);
    } else {
      alert('Please fill out all fields');
    }
  }

  clearAll() {
    this.myForm.reset();
    this.bannerimageSrc = '';
    this.bannerimageName = '';
    // this.urlFile = '';
  }

  doNothing() {}
}
