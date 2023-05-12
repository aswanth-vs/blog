import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  constructor(
    private api: ApiserviceService,
    private viewActivatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data: any) => {
      console.log(data.id);
      this.postID = data.id;
      console.log(this.postID);
    });
    this.api.viewpost(this.postID).subscribe(
      //200
      (result: any) => {
        this.post = result;
        console.log(this.post);
        this.content = this.post.content.text;
        this.formatContentText(this.content);
        this.tags = this.post.tags;
      },
      //400
      (result: any) => {
        console.log(result);
      }
    );
  }

  postID: string = '';
  post: any = {};
  content: any = '';
  contentFinal: any = '';
  tags: any = [];

  formatContentText(data: any) {
    //splitting the data based on line breaks and () [images, headings]
    data = data.split(/[\n<>]+/).filter((item: any) => item.length);
    console.log(data);

    //looping through the data to replace headings and images with their curresponsing tags
    data.forEach((item: any) => {
      // check for heading
      if (item[0] == ':' && item[item.length - 1] == ':') {
        let temp = item.slice(1, -1);
        this.contentFinal += `<h3 class="mt-2 mb-2">${temp}</h3>`;
      }
      //checking for images
      else if (item[0] == '|' && item[item.length - 1] == '|') {
        let temp = item.slice(1, -1);
        this.post.content.images.forEach((item: any) => {
          if (item.name == temp) {
            this.contentFinal += `
            <div class="imgwrap" style="display:flex; justify-content:center">
            <img class="img-fluid" src="${item.image}" alt="${item.name}" style="height:300px; margin-block:15px" />
            </div>`;
          }
        });
      }
      //showing plain text
      else {
        this.contentFinal += `<p >${item}</p>`;
      }
    });
    console.log(this.contentFinal);
  }
}
