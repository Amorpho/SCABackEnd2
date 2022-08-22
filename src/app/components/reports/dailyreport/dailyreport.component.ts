import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Chart, ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {Observable, Subscription} from "rxjs";
import {default as Annotation} from 'chartjs-plugin-annotation';

import {DailyModelModel} from "../../../shared/dailyModel.model";
import {ServiceFirebaseService} from "../../../shared/service-firebase.service";
import {ClientGroup} from "../../../shared/clien-group.model";


@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css']
})
export class DailyreportComponent implements OnInit, OnDestroy {

  listUser: string [] = []
  //fast Search
  statusFastSearch = ''
  assignmentTypeFastSearch = ''
  clientFastSearch = ''
  claimNumberFastSearch = ''
  //fast Search end
  // Database local
  statusSelect: string[] = ['Complete', 'Pending']
  groupClient: ClientGroup[] = []
  assignments: string [] = []
  claimNumberBoolean = true;
  dateBoolean = true;
  timeBoolean = true;
  statusBoolean = true;
  assignmentBoolean = true;
  processedByBoolean = true;
  clientBoolean = true;
  exception1Boolean = true;
  exception2Boolean = true;

  // Database local END
  sortForm!: FormGroup;
  dataSource: DailyModelModel[] = []
  obsDailyReport!: Subscription;

  constructor(private FBService: ServiceFirebaseService) {
    Chart.register(Annotation)
  }


  ngOnInit(): void {
    this.getGroupClients()
    this.initForm()
  }

  ngOnDestroy() {
    this.obsDailyReport.unsubscribe();
  }

  initForm() {
    this.sortForm = new FormGroup({
      claimNumber: new FormControl(''),
      range: new FormGroup({
        startDate: new FormControl(new Date()),
        endDate: new FormControl(new Date()),
      }),
      status: new FormControl(''),
      assignment: new FormControl(''),
      client: new FormControl(''),
      processedBy: new FormControl('')
    })


  }

  getGroupClients() {
    this.FBService.getAllUsers().subscribe(result => {
      this.listUser = []
      result.forEach((element: any) => {
        this.listUser.push(
          element.payload.doc.data().shortName
        )
      })
    })


    this.FBService.getAllCompanyGroups().subscribe(result => {
      this.groupClient = [];
      result.forEach((elements: any) => {
        this.groupClient.push({
          id: elements.payload.doc.id,
          ...elements.payload.doc.data()
        })
      })

      this.groupClient.forEach((element) => {
        element.assignments.forEach((element: any) => {
          this.assignments.push(element.value)
        })
      })

      this.assignments = this.assignments.filter((item, index) => {
        return this.assignments.indexOf(item) === index;
      })


      this.listUser = this.listUser.filter((item, index) => {
        return this.listUser.indexOf(item) === index
      })


    })
  }


  onSortData() {
    let dataCount1: { data: string, counter: number }[] = []
    let dataCount2: { data: string, counter: number }[] = []

    this.obsDailyReport = this.FBService.getReport(this.sortForm.value.range.startDate, this.sortForm.value.range.endDate).subscribe(result => {
        this.dataSource = []
        result.forEach((element: any) => {
          this.dataSource.push({
            id: element.payload.doc.id,
            date: element.payload.doc.data().date.toDate(),
            status: element.payload.doc.data().status,
            processedBy: element.payload.doc.data().processedBy,
            exception: element.payload.doc.data().exception,
            exception2: element.payload.doc.data().exception2,
            client: element.payload.doc.data().client,
            assignment: element.payload.doc.data().assignmentType,
            claimNumber: element.payload.doc.data().claimNumber
          })
        })
        let anArray = []
        let anArray2 = []

        for (let i = 0; i < this.dataSource.length; i++) {

          if (this.dataSource[i].status === 'Complete') {
            anArray.push(this.dataSource[i].date.toLocaleDateString())
          } else {
            anArray2.push(this.dataSource[i].date.toLocaleDateString())
          }

        }
        let dayFinderComplete = ''
        let countComplete = 0
        for (let i = 0; i < anArray.length; i++) {
          if (dayFinderComplete != anArray[i]) {
            countComplete = 0
            dayFinderComplete = anArray[i]
            countComplete++
            dataCount1.push({data: dayFinderComplete, counter: countComplete})
          } else {
            let index = dataCount1.map(function (e) {
              return e.data;
            }).indexOf(dayFinderComplete)
            countComplete++
            dataCount1[index].counter = countComplete
          }
        }
        let dayFinderPending = ''
        let countPending = 0
        for (let i = 0; i < anArray2.length; i++) {
          if (dayFinderPending != anArray2[i]) {
            countPending = 0
            dayFinderPending = anArray2[i]
            countPending++
            dataCount2.push({data: dayFinderPending, counter: countPending})
          } else {
            let index = dataCount2.map(function (e) {
              return e.data;
            }).indexOf(dayFinderPending)
            countPending++
            dataCount2[index].counter = countPending

          }
        }


        let arrayDays: string[] = []
        let arrayDataComplete: number[] = []
        dataCount1.forEach((element: any) => {
          arrayDays.push(element.data)
          arrayDataComplete.push(element.counter)
        })
        let arrayDataPending: any = []
        dataCount2.forEach((element: any) => {
          arrayDataPending.push(element.counter)
        })

        console.log(arrayDays)
        console.log(arrayDataComplete)
        this.lineChartData.datasets = []
        this.lineChartData.datasets.push(
          {
            data: arrayDataComplete,
            label: 'ASSIGNMENT DONE QTY',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgb(255,0,0)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
          {
            data: arrayDataPending,
            label: 'EXCEPTIONS FOUND',
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
            fill: 'origin',
          }
        )

        this.lineChartData.labels = []
        arrayDays.forEach((element: any) => {
          this.lineChartData?.labels?.push(element)
        });

        this.chart?.update();
      }
    )


  }


  //Graphics


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'ASSIGNMENT DONE QTY',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(255,0,0)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [22, 42, 30, 25, 60, 17, 75],
        label: 'EXCEPTIONS FOUND',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    }
  };

  public lineChartType: ChartType = 'line';

}
