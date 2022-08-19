import {Component, OnInit} from '@angular/core';

interface CompanyGroupRules {
  id?: string,
  companyName: string,
  assignmentType: AssignmentType[]
}

interface AssignmentType {
  assignmentName: string,
  assignmentRules: AssignmentRules[]
}

interface AssignmentRules {
  exception: string,
  status: string
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  listCompanyGroup: CompanyGroupRules[] = [
    {
      companyName: 'Travelers',
      assignmentType: [{
        assignmentName: 'Desk Review',
        assignmentRules: [
          {exception: 'Attachment Mismatch', status: 'Pending'},
          {exception: 'Estimate Missing', status: 'Pending'},
          {exception: 'Please Check Profile', status: 'Pending'},
          {exception: 'VIN Missing', status: 'Complete'},
          {exception: 'Underwriter missing', status: 'Complete'},
        ]
      },
        {
          assignmentName: 'Desk Write',
          assignmentRules: [
            {exception: 'Attachment Mismatch', status: 'Pending'},
            {exception: 'Please Check Profile', status: 'Pending'},
            {exception: 'Pictures Missing', status: 'Pending'},
            {exception: 'Underwriter missing', status: 'Complete'},
            {exception: 'VIN Missing', status: 'Pending'},
          ]
        },
        {
          assignmentName: 'Independent appraisal',
          assignmentRules: [
            {exception: 'Tow yard and Vin Missing', status: 'Pending'},
            {exception: 'Please Check Profile', status: 'Pending'},
            {exception: 'Unknown Address', status: 'Pending'},
            {exception: 'No phone number', status: 'Pending'},
            {exception: 'Missing #VSF011 Form', status: 'Pending'},
            {exception: 'Underwriter missing', status: 'Complete'},
          ]
        },
      ]
    },
    {
      companyName: 'National General',
      assignmentType: [{
        assignmentName: 'Desk Write',
        assignmentRules: [
          {exception: 'VIN Missing', status: 'Pending'},
          {exception: 'VIN Mismatch', status: 'Pending'},
          {exception: 'Attachment Mismatch', status: 'Pending'},
          {exception: 'Please Check Profile', status: 'Pending'},
          {exception: 'Underwriter missing', status: 'Complete'},
        ]
      }, {
        assignmentName: 'Standard Inspection',
        assignmentRules: [
          {exception: 'Tow yard and Vin Missing', status: 'Pending'},
          {exception: 'Please Check Profile', status: 'Pending'},
          {exception: 'Unknown Address', status: 'Pending'},
          {exception: 'No phone number', status: 'Pending'},
          {exception: 'Missing #VSF011 Form', status: 'Pending'},
          {exception: 'Underwriter missing', status: 'Complete'},
        ]
      },
      ]

    },
  ]


  constructor() {
  }

  ngOnInit(): void {

  }

}
