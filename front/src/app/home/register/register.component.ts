import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';
declare var bootstrap: any;

// import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private registerFb: FormBuilder,
    private api: ApiserviceService,
    private registerRouter: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    document.body.style.background = 'rgb(0, 104, 74)';
    if (localStorage.getItem('token')) {
      this.registerRouter.navigateByUrl('');
    }
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnDestroy(): void {
    document.body.style.background = 'white';
  }

  registerErrorMsg: string = '';
  registerSuccessMsg: string = '';

  //Form group
  registerForm = this.registerFb.group({
    //form array
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9!@#$%^&*()_+-=]*'),
        Validators.minLength(8),
      ],
    ],
  });

  // avatars
  avatars: any = [
    {
      name: 'man_gamer',
      url: 'https://i.ibb.co/7RTw8GT/man-gamer.png',
    },
    {
      name: 'man_black_hair',
      url: 'https://i.ibb.co/Yp1LdRt/man-black-hair.png',
    },
    {
      name: 'woman_black_hair',
      url: 'https://i.ibb.co/dg0MDvW/woman-black-hair.png',
    },
    {
      name: 'woman_laugh',
      url: 'https://i.ibb.co/JHr4nFM/woman-laugh.png',
    },
  ];

  avatarSelected: any = [];
  onAvatarSelect(event: any) {
    console.log(event.target.value);
    this.avatars.forEach((i: any) => {
      if (i.name == event.target.value) {
        this.avatarSelected = i;
      }
    });
    console.log(this.avatarSelected);
  }

  register() {
    if (this.registerForm.valid) {
      if (!(this.avatarSelected.length < 1)) {
        let username = this.registerForm.value.username;
        let name = this.registerForm.value.name;
        let password = this.registerForm.value.password;
        this.api
          .register(name, username, password, this.avatarSelected)
          .subscribe(
            (result: any) => {
              this.registerSuccessMsg = result;
              // alert(this.registerSuccessMsg);
              setTimeout(() => {
                this.registerRouter.navigateByUrl('login');
                this.registerSuccessMsg = '';
              }, 3000);
            },
            (result: any) => {
              this.registerErrorMsg = result.error;
              alert(this.registerErrorMsg);
              setTimeout(() => {
                this.registerForm.reset();
                this.registerErrorMsg = '';
              }, 4000);
            }
          );
      } else {
        alert('Select an Avatar');
      }
    } else {
      alert('Invalid');
    }
  }
}
