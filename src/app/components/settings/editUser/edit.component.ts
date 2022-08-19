import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ServiceFirebaseService} from "../../../shared/service-firebase.service";
import {UserModel} from "../../../shared/user.model";


@Component({
  selector: 'app-edit-user',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() showEditMode = new EventEmitter<boolean>();
  userForm!: FormGroup;
  hide = true
  @ViewChild('formDirective') private formDirective!: NgForm;
  @ViewChild('fullName') private fullName!: ElementRef;
  @ViewChild('shortName') private shortName!: ElementRef;
  @ViewChild('password') private password!: ElementRef;
  private idUser: string = ''
  private userProfile: UserModel = {userName: '', shortName: '', level: 0, id: '', password: ''};


  constructor(private route: ActivatedRoute, private FBservice: ServiceFirebaseService, private router: Router) {
  }

  onSubmit() {

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
    this.initForm();

    this.route.params.subscribe((params: Params) => {
      this.idUser = params['id']
      console.log(this.idUser)
    })


    this.FBservice.getUserProfile(this.idUser).subscribe((result: any) => {
      const data = result.data();
      if (data) {
        console.log(data.userName)
        this.userForm.patchValue({
          fullName: data.userName,
          shortName: data.shortName,
          level: data.level
        })
      } else {

      }

    })
  }

  onCancel() {
    this.showEditMode.emit(false)
  }

}
