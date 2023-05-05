import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/service/apiservice.service';

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
  }

  ngOnDestroy(): void {
    document.body.style.background = 'white';
  }

  registerErrorMsg: string = '';
  registerSuccessMsg: string = '';

  //Form group
  registerForm = this.registerFb.group({
    //form array
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
  });

  register() {
    if (this.registerForm.valid) {
      let username = this.registerForm.value.username;
      let name = this.registerForm.value.name;
      let password = this.registerForm.value.password;
      this.api.register(name, username, password).subscribe(
        (result: any) => {
          this.registerSuccessMsg = result.message;
          setTimeout(() => {
            this.registerRouter.navigateByUrl('login');
          }, 3000);
        },
        (result: any) => {
          this.registerErrorMsg = result.error.message;
          setTimeout(() => {
            this.registerForm.reset();
            this.registerErrorMsg = '';
          }, 4000);
        }
      );
    } else {
      alert('Invalid');
    }
  }
}
