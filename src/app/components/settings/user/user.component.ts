import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {UserModel} from "../../../shared/user.model";
import {ServiceFirebaseService} from "../../../shared/service-firebase.service";


@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {
  actualUser = ''
  users: UserModel[] = []
  editMode = false

  constructor(private FBService: ServiceFirebaseService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}')
    this.actualUser = user.shortName;

  }

  onLoadUsers() {
    this.FBService.getAllUsers().subscribe(result => {
      this.users = []
      result.forEach((data: any) => {
        this.users.push({
          id: data.payload.doc.id,
          ...data.payload.doc.data()
        })
      })
    })
  }


  onDeleteUser(idUser: UserModel) {
    this.FBService.delUser(idUser.id).then(() => {
      console.log('User Deleted')
    })
  }

  onEditUser() {
    this.editMode = true
  }
}
