import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ServiceFirebaseService} from "../../shared/service-firebase.service";
import {DailyModelModel} from "../../shared/dailyModel.model";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  date = new Date;
  processedNavbar = ''
  userBar: boolean = false;
  userBarAnimation = 'normal'
  percentage = 0;
  yourwork = 0;
  allRecords: DailyModelModel[] = []
  totalWork = 0;

  constructor(private FBservice: ServiceFirebaseService,
              private router: Router) {
  }

  ngOnInit(): void {

    // this.processedNavbar = this.FBservice.getProcessed();
    const usertemp = JSON.parse(localStorage.getItem('userData') || '{}')
    this.processedNavbar = usertemp.shortName;

    setInterval(() => {
      this.date = new Date();
    }, 1000);


    this.FBservice.getAllRecords().subscribe((res: DailyModelModel[]) => {
      this.allRecords = []
      this.yourwork = 0;
      res.forEach((element: any) => {
        this.allRecords.push({
          id: element.payload.doc.id,
          date: element.payload.doc.data().date.toDate(),
          status: element.payload.doc.data().status,
          processedBy: element.payload.doc.data().processedBy,
          exception: element.payload.doc.data().exception,
          exception2: element.payload.doc.data().exception2,
          client: element.payload.doc.data().client,
          assignment: element.payload.doc.data().assignmentType,
          claimNumber: element.payload.doc.data().claimNumber,
          // ...element.payload.doc.data()
        })
      })
      this.totalWork = this.allRecords.length;
      for (let i = 0; i < this.totalWork; i++) {
        if (this.allRecords[i].processedBy == this.processedNavbar) {
          this.yourwork++
        }
      }
      this.percentage = (this.yourwork / this.totalWork)
    })

  }

  onLogout() {
    localStorage.removeItem('userData')
    this.router.navigate(['/'])
  }

  onClickUser() {
    this.userBarAnimation === 'normal' ? this.userBarAnimation = 'displayed' : this.userBarAnimation = 'normal'
    this.userBar = !this.userBar
  }

}
