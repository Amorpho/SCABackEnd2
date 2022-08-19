import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  statusSelected = ''
  // Database local
  statusSelect: string[] = ['Complete', 'Pending']
  exceptions:string[]=['Unreadable VIN',
    'VIN Picture missing',
    'VIN Mismatch',
    'Underwriter missing',
    'Estimate missing',
    'Pictures missing',
    'CCC email not received',
    'Closed No Billing',
    'ZIP mismatch',
    'File not availabe In Core',
    'Attachments mismatch',
    'Supplement request',
    'Corrupt/link attachments',
    'Please check profile',
    'Independent appraisal',
    'Invalid Location (MA/RI)',
    'Type 01 Field',
    'Unknown Address',
    'No phone number',
    'Tow Yard',
    'Mercedes',
    'Missing #VSF011 Form'
  ]
  assignmentTypes:string[]=[
    'Desk Review',
    'Desk Write',
    'Independent appraisal',
    'Supplement',
    'Field',
  ]
  // Database local END

  dailyForm!: FormGroup;

  dataSource: dailyModel[] = [

    {
      claimNumber: 'ABC1234567',
      date: '1/06/22',
      time: '08:00 AM',
      status: 'Complete',
      processedBy: 'Martin T',
      assignamentType: 'Desk Write',
      exception: 'exeption1'
    },
    {
      claimNumber: '321-321-321-321-321-321',
      date: '18/06/22',
      time: '8:00 AM',
      status: 'Complete',
      processedBy: 'Martin T',
      assignamentType: 'Desk Review',
      exception: 'exeption1'
    }
  ];

  constructor() {


  }

  onSubmit(){
    console.log(this.dailyForm)
  }


  ngOnInit(): void {
    this.dailyForm = new FormGroup({
      claimNumber: new FormControl('', Validators.required),
      exception: new FormControl(null)
    })
  }

//fuuntions to fill the form....

  auntoFill() {
    // this.dataSource.push({
    //     claimNumber: 'hfdfdf',
    //     date: 'number',
    //     time: 'temprano',
    //     processedBy: 'string',
    //     reviewebBy: 'string',
    //     assignamentType: 'hahahha',
    //     exception: 'exeption1'
    //   }
    // );
  }

  alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  firstChars: string = '';

  generateNumber() {
    this.firstChars = ''
    let numberone = Math.floor(Math.random() * this.alphabet.length) + 1;   //Generate a number ramdom between 1 and max
    let numbertwo = Math.floor(Math.random() * this.alphabet.length) + 1;
    let numberthree = Math.floor(Math.random() * this.alphabet.length) + 1;


    for (let i = 0; i < this.alphabet.length; i++) {
      if (i == numberone) {
        this.firstChars = this.firstChars + this.alphabet[i]
      }
      if (i == numbertwo) {
        this.firstChars = this.firstChars + this.alphabet[i]
      }
      if (i == numberthree) {
        this.firstChars = this.firstChars + this.alphabet[i]
      }
    }
    for (let i = 0; i < 7; i++) {
      this.firstChars = this.firstChars + Math.floor(Math.random() * (9 + 1)); //generate number ramdom between 9 and 0
    }

  }

//fuuntions to fill the form....


}


export interface dailyModel {

  claimNumber: string;
  date: string;
  time: string;
  status: string;
  processedBy: string;
  assignamentType: string;
  exception: string;

}


