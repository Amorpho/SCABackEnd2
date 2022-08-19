import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatOptionSelectionChange} from "@angular/material/core";
import Swal from "sweetalert2";

import {DailyModelModel} from "../../shared/dailyModel.model";
import {ServiceFirebaseService} from "../../shared/service-firebase.service";
import {DailyService} from "../../shared/daily.service";
import {UserModel} from "../../shared/user.model";
import {ClientGroup} from "../../shared/clien-group.model";
import {Exceptions} from "../../shared/exceptions.model";
import {DailyRecord} from "../../shared/daily-record.service";


@Component({
  selector: 'app-daily-tracker',
  templateUrl: './daily-tracker.component.html',
  styleUrls: ['./daily-tracker.component.css']
})
export class DailyTrackerComponent implements OnInit {

  selectedClient = ''
  processed = ''
  valueAssignment = ''
  statusSelected = 'Complete'
  exceptionDefault = 'None'
  exceptionDefault2 = 'None'
  update = false;
  loadingSpinner = false;
  oldRecord!: DailyModelModel;
  datePicker: Date = new Date();
  dailyForm!: FormGroup;
  sortForm!: FormGroup;
  dataSource: DailyModelModel[] = [];
  listUser: string [] = [  ]
  //fast Search
  statusFastSearch = ''
  assignmentTypeFastSearch = ''
  clientFastSearch = ''
  claimNumberFastSearch = ''
  processedFastSearch = ''
  //fast Search end
  // Database local
  statusSelect: string[] = ['Complete', 'Pending']
  exceptions: Exceptions[] = []
  groupClient: ClientGroup[] = []
  @ViewChild('dailyNgForm') dailyNgForm!: NgForm;

  // Database local END


  constructor(private _firestoreService: ServiceFirebaseService,
              private toastr: ToastrService,
              private dailyService: DailyService,
              private dailyRecord: DailyRecord) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.initProfile();
    this.initForm();
    this.getAllRecords(this.datePicker);
    this.dailyService.setDailyWork(this.dataSource)
  }

  initProfile() {
    const usertemp: UserModel = JSON.parse(localStorage.getItem('userData') || '{}')
    this.processed = usertemp.shortName.toString();

    this._firestoreService.getAllCompanyGroups().subscribe(result => {
      this.groupClient = []
      result.forEach((element: any) => {
        this.groupClient.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })

    this._firestoreService.getAllExceptions().subscribe(result => {
      this.exceptions = []
      result.forEach((element: any) => {
        this.exceptions.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  initForm() {
    this.dailyForm = new FormGroup({
      claimNumber: new FormControl(''),
      date: new FormControl(''),
      status: new FormControl('Complete'),
      processed: new FormControl(this.processed),
      assignment: new FormControl(''),
      exceptions: new FormControl(''),
      exception2: new FormControl('')
    })

    this.sortForm = new FormGroup({
      claimNumberSearch: new FormControl(''),
      exceptionsSearch: new FormControl(''),
      assignmentSearch: new FormControl(''),
      statusSearch: new FormControl(''),
      datePicker: new FormControl(this.datePicker),
      client: new FormControl(''),
      processedSearch: new FormControl('')
    })
  }

  onselectStatus() {

  }

  onSelectAssignment() {
    this.valueAssignment = ''
  }

  optionSelected(event: MatOptionSelectionChange) {
    this.selectedClient = event.source.group.label;
  }

  //fast Search END

  onSubmitDaily() {
    if (this.dailyForm.get('claimNumber')?.value === '') {
      this.toastr.error('Claim Number it is empty', 'Error')

      return
    }
    if (this.dailyForm.get('assignment')?.value === '') {
      this.toastr.error('Assignment it is empty', 'Error')
      return
    }

    this.loadingSpinner = true;
    const record: DailyModelModel = {
      claimNumber: this.dailyForm.value.claimNumber.trim(),
      date: new Date(),
      status: this.dailyForm.value.status,
      processedBy: this.processed,
      client: this.selectedClient,
      assignment: this.dailyForm.value.assignment,
      exception: this.dailyForm.value.exceptions,
      exception2: this.dailyForm.value.exception2
    }

    for (let i = 0; i < this.dataSource.length; i++) {
      if (record.claimNumber === this.dataSource[i].claimNumber) {
        this.update = true;
        this.oldRecord = this.dataSource[i];
      }

    }

    if (this.update) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        html: '<table class="container">\n' +
          '        <thead class="table table-bordered">\n' +
          '        <tr>\n' +
          '          <th class="border border-end" scope="col"></th>\n' +
          '          <th class="border border-end" scope="col">Claim Number</th>\n' +
          '          <th class="border border-end" scope="col">Status</th>\n' +
          '          <th class="border border-end" scope="col">Processed By</th>\n' +
          '          <th class="border border-end" scope="col">Assignment type</th>\n' +
          '          <th class="border border-end" scope="col">Client</th>\n' +
          '          <th class="border border-end" scope="col">Exception</th>\n' +
          '          <th class="border border-end" scope="col">Exception2</th>\n' +
          '        </tr>\n' +
          '        </thead>\n' +
          '        <tbody class="border border-2" >\n' +
          '           <tr class="border">' +
          '        <td >' + 'New' + ' </td>\n' +
          '        <td >' + record.claimNumber + ' </td>\n' +
          '        <td>' + record.status + '</td>\n' +
          '        <td>' + record.processedBy + ' </td>\n' +
          '        <td>' + record.assignment + '</td>\n' +
          '        <td>' + record.client + '</td>\n' +
          '        <td>' + record.exception + '</td>\n' +
          '        <td>' + record.exception2 + '</td>\n' +
          '           </tr>' +
          '           <tr>' +
          '        <td >' + 'Old' + ' </td>\n' +
          '        <td >' + this.oldRecord.claimNumber + ' </td>\n' +
          '        <td>' + this.oldRecord.status + '</td>\n' +
          '        <td>' + this.oldRecord.processedBy + ' </td>\n' +
          '        <td>' + this.oldRecord.assignment + '</td>\n' +
          '        <td>' + this.oldRecord.client + '</td>\n' +
          '        <td>' + this.oldRecord.exception + '</td>\n' +
          '        <td>' + this.oldRecord.exception2 + '</td>\n' +
          '           </tr>' +
          '        </tbody>\n' +
          '      </table>',
        width: 1000,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Swal.fire('Saved!', '', 'success')
          this._firestoreService.updateRecord(this.oldRecord.id, record).then(() => {
            this.toastr.info('Claim Number ' + record.claimNumber + ' updated ', 'Success')
            this.update = false;
            this.loadingSpinner = false;
          }, error => {
            console.log(error)
          })
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
          this.loadingSpinner = false;
        }
        this.loadingSpinner = false;
      })
    } else {
      this.dailyRecord.addRecord(record)
      this._firestoreService.addNewrecord(record).then(() => {
        this.toastr.success('Claim Number ' + record.claimNumber + ' added ', 'Success')
        this.loadingSpinner = false;
      })
    }

    this.update = false;

    this.dailyForm.patchValue({
      claimNumber: '',
      assignment: '',
      status: 'Complete',
      exceptions: 'None',
      exception2: 'None'
    })


  }

  getUsers() {
    this._firestoreService.getAllUsers().subscribe(result => {
      this.listUser = [];
      result.forEach((element: any) => {
        this.listUser.push(
          element.payload.doc.data().shortName
        )
      })
    });
  }

  getAllRecords(datePicker: Date) {
    this._firestoreService.getRecords(datePicker).subscribe(allRecords => {
      this.dataSource = []
      allRecords.forEach((element: any) => {
        this.dataSource.push({
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
    })



  }

  auntoFill() {
    navigator['clipboard'].readText().then(clipText => {
      // do something with copied text here
      this.dailyForm.patchValue({
        claimNumber: clipText
      })
      this.update = false
    });
  }

  enableAddrecord() {
    return (
      this.dailyForm.get('claimNumber')?.value === '' ||
      this.dailyForm.get('assignment')?.value === '' ||
      (this.dailyForm.get('status')?.value === 'Pending' && this.dailyForm.get('exceptions')?.value === 'None'))
  }

  updateClaim(claim: DailyModelModel) {

    this.update = true;
    this.oldRecord = {
      assignment: claim.assignment,
      status: claim.status,
      processedBy: claim.processedBy,
      date: claim.date,
      exception: claim.exception,
      exception2: claim.exception2,
      claimNumber: claim.claimNumber,
      client: claim.client,
      id: claim.id
    }


    this.dailyForm.patchValue({
      claimNumber: claim.claimNumber,
      status: claim.status,
      processed: this.processed,
      assignment: claim.assignment,
      exceptions: claim.exception,
      exceptions2: claim.exception2,
    })


  }

  onCancel() {
    this.dailyForm.patchValue({
      claimNumber: '',
      status: 'Complete',
      exceptions: 'None',
      exception2: 'None',
      assignment: ''
    })

    this.update = false;
  }

  onDelete() {
    let claimNumber = this.oldRecord.claimNumber;
    this._firestoreService.deleteRecord(this.oldRecord.id).then(() => {
      this.toastr.error('Record delete with claim number ' + claimNumber, 'Record delete')
    })
    this.onCancel();

  }

  onSubmitSort() {
    const newSort = this.sortForm.value;
    this.getAllRecords(this.datePicker);
  }

  clearSort() {

  }

}
