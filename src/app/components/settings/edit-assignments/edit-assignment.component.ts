import {Component, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

import {ClientGroup} from "../../../shared/clien-group.model";
import {ServiceFirebaseService} from "../../../shared/service-firebase.service";


@Component({
  selector: 'app-edit-assignment',
  templateUrl: 'edit-assignment.component.html',
  styleUrls: ['edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  @ViewChild('assignmentForm') private assignmentForm!: NgForm;
  assignmentGroup!: FormGroup;

  groupClient: ClientGroup[] = [
    {
      clientName: 'Travelers',
      assignments: [
        {value: 'Desk Review'},
        {value: 'Desk Write'},
        {value: 'Independent appraisal'},
        {value: 'Supplement'},
        {value: 'Field'},
      ],
    },
    {
      clientName: 'National General',
      assignments: [
        {value: 'Desk Review'},
        {value: 'Desk Write'},
        {value: 'Standard Inspection'},

      ],
    },
    {
      clientName: 'Amica',
      assignments: [
        {value: 'Supplemental Assignment'},
        {value: 'Standard Inspection '},

      ],
    },
    {
      clientName: 'ESIS',
      assignments: [
        {value: 'Supplemental Assignment'},
        {value: 'Standard Inspection '},

      ],
    },
    {
      clientName: 'CSAA',
      assignments: [
        {value: 'Supplemental Assignment'},
        {value: 'Standard Inspection '},

      ],
    },
    {
      clientName: 'Other',
      assignments: [
        {value: 'Desk Review'},
        {value: 'Desk Write'},
        {value: 'Independent appraisal'},
        {value: 'Supplement'},
        {value: 'Field'},
        {value: 'Supplemental Assignment'},
        {value: 'Standard Inspection '},

      ],
    },
  ]

  constructor(private FBService: ServiceFirebaseService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    let assignmentArray = new FormArray([]);
    this.assignmentGroup = new FormGroup({
      companyName: new FormControl('', Validators.required),
      assignment: assignmentArray
    })

    this.FBService.getAllCompanyGroups().subscribe(result => {
      this.groupClient = []
      result.forEach((element: any) => {
        this.groupClient.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })

  }

  addException() {
    (<FormArray>this.assignmentGroup.get('assignment')).push(new FormGroup({
      value: new FormControl('', Validators.required)
    }));

  }

  getAllAssignmentControl() {
    return (<FormArray>this.assignmentGroup.get('assignment')).controls;
  }

  onCancelException(index: number) {
    (<FormArray>this.assignmentGroup.get('assignment')).removeAt(index)
  }


  onDelException() {

  }

  onAddCompanyGroup() {

    if (this.assignmentGroup.invalid || this.getAllAssignmentControl().length <= 0) {
      this.toastr.error('fill out the form correctly and add at least one Assignment', 'Error!')
      return;
    }
    const group: ClientGroup = {
      clientName: this.assignmentGroup.get('companyName')?.value,
      assignments: this.assignmentGroup.get('assignment')?.value
    }

    this.FBService.addCompanyGroup(group).then(() => {
      this.toastr.success('Company Name: ' + group.clientName + ' successfully added', 'Success!!')
    })

    for (let i = this.getAllAssignmentControl().length; i >= 0; i--) {
      this.onCancelException(i);
    }

    this.assignmentForm.resetForm();

  }

  onDellCompanyGroup(id: string) {
    this.FBService.delCompanyGroup(id).then(() => {
      this.toastr.success('Group Deleted','Success')
    })
  }

}
