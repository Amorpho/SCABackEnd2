import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ServiceFirebaseService} from "../../shared/service-firebase.service";
import {AuthService} from "../../shared/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../shared/user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  processed = 'No hay nombre'
  hide = true;
  user: UserModel = {userName: '', shortName: '', level: 0, id: '', password: ''};

  constructor(private FBservice: ServiceFirebaseService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  onSubmit() {

    if (this.userForm.get('password')?.value == '') {
      this.toastr.error('User or password incorrect','Error!')
      return;
    }

    if (this.userForm.invalid) {
      this.toastr.error('User or password incorrect','Error!')
      return;
    }

    this.FBservice.getUser(this.userForm.value.userName.toLowerCase()).subscribe(result => {
      result.forEach((data: any) => {
        this.user = {
          id: data.payload.doc.id,
          ...data.payload.doc.data()
        }
      })

      if (this.user.userName === this.userForm.value.userName.toLowerCase() && this.user.password === this.userForm.value.password) {
        this.router.navigate(['/home/dailyTracker']).then(() => {
        })
        localStorage.setItem('userData', JSON.stringify(this.user))
      } else {
        this.toastr.error('User or password incorrect','Error!')
        return;
      }
    })

    this.user = {userName: '', shortName: '', level: 0, id: '', password: ''};
  }
}
