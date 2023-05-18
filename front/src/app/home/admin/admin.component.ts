import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private registerFb: FormBuilder,
    private api: ApiserviceService,
    private loginRouter: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.body.style.background = 'rgb(0, 104, 74)';
    if (localStorage.getItem('token')) {
      this.loginRouter.navigateByUrl('');
    }
  }

  ngOnDestroy(): void {
    document.body.style.background = 'white';
  }

  loginErrorMsg: string = '';
  loginSuccessMsg: string = '';

  //Form group
  loginForm = this.registerFb.group({
    //form array

    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'
        ),
      ],
    ],
  });
  //  name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],

  // '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}
  // (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}

  login() {
    if (this.loginForm.valid) {
      let username: any = this.loginForm.value.username;
      // let name = this.loginForm.value.name;
      let password = this.loginForm.value.password;
      this.api.adminLogin(username, password).subscribe(
        (result: any) => {
          this.loginSuccessMsg = result;
          // localStorage.setItem('currentUser', result.currentUser);
          //store token in local storage
          localStorage.setItem('token', result.token);
          localStorage.setItem('admin', result.admin);
          localStorage.setItem('username', username);
          setTimeout(() => {
            window.location.reload();
            this.loginRouter.navigateByUrl('');
            this.loginSuccessMsg = '';
          }, 3000);
        },
        (result: any) => {
          this.loginErrorMsg = result.error;
          alert(this.loginErrorMsg);
          setTimeout(() => {
            this.loginForm.reset();
            this.loginErrorMsg = '';
          }, 4000);
        }
      );
    } else {
      alert('Invalid');
    }
  }
}
