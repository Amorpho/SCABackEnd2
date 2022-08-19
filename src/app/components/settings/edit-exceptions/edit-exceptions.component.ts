import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import {ServiceFirebaseService} from "../../../shared/service-firebase.service";
import {Exceptions} from "../../../shared/exceptions.model";



@Component({
  selector: 'app-edit-exceptions',
  templateUrl: './edit-exceptions.component.html',
  styleUrls: ['./edit-exceptions.component.css']
})
export class EditExceptionsComponent implements OnInit {


  @ViewChild('exceptionform') private exceptionform!: NgForm;
  exceptionGroup!: FormGroup;

  list: Exceptions[] = [
    {description: 'No mms'},
    {description: 'No jds'},
    {description: 'Chaleee'}
  ]

  constructor(private FbService: ServiceFirebaseService) {
  }

  ngOnInit(): void {
    this.initForm()
    this.FbService.getAllExceptions().subscribe(result => {
      this.list = []
      result.forEach((elements: any) => {
        this.list.push({
          id: elements.payload.doc.id,
          ...elements.payload.doc.data()
        })
      })
    })
  }

  initForm() {
    this.exceptionGroup = new FormGroup({
      exception: new FormControl('', Validators.required)
    })
  }

  onAddException() {

    if (this.exceptionGroup.invalid) {
      return
    }
    const exception: Exceptions = {
      description: this.exceptionGroup.get('exception')?.value
    }
    this.FbService.addException(exception).then(() => {
      console.log('Exception Added')
      this.exceptionform.resetForm()
    })


  }

  onDelException(index: string) {
    this.FbService.delException(index).then(() => {

    })
  }

}
