import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ServiceFirebaseService} from "../../../shared/service-firebase.service";
import {UserModel} from "../../../shared/user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-user',
  templateUrl: 'newUser.component.html',
  styleUrls: ['newUser.component.css']
})
export class NewUserComponent implements OnInit {
  hide = true;
  @ViewChild('formDirective') private formDirective!: NgForm;
  @ViewChild('fullName') private fullName!: ElementRef;
  @ViewChild('shortName') private shortName!: ElementRef;
  @ViewChild('password') private password!: ElementRef;
  userForm!: FormGroup;

  constructor(private FBService: ServiceFirebaseService,
              private toastr: ToastrService) {
  }

  initForm() {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      shortName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      level: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {


    if (this.userForm.get('fullName')?.invalid) {
      this.fullName.nativeElement.focus()
      return;
    }
    if (this.userForm.get('shortName')?.invalid) {
      this.shortName.nativeElement.focus()
      return;
    }

    if (this.userForm.get('password')?.invalid) {
      this.password.nativeElement.focus()
      return;
    }


    if (this.userForm.get('password')?.value != this.userForm.get('password2')?.value) {
      this.userForm.get('password')?.reset()
      this.userForm.get('password2')?.reset()
      this.password.nativeElement.focus()
      return;
    }

    if (this.userForm.get('level')?.invalid) {
      return;
    }

    if (this.userForm.invalid) {
      return
    }

    const user: UserModel = {
      userName: this.userForm.value.fullName.trim().toLocaleLowerCase(),
      shortName: this.userForm.value.shortName.trim(),
      password: this.userForm.value.password,
      level: this.userForm.value.level,
    }

    this.FBService.addNewUser(user).then(() => {
      this.toastr.success('New User Added: '+ user.userName,'Success')
    })

    this.formDirective.resetForm()
  }
}
