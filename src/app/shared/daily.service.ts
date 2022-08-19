import {Injectable, OnInit} from '@angular/core';
import {DailyModelModel} from "./dailyModel.model";

@Injectable({
  providedIn: 'root'
})
export class DailyService implements OnInit {
  processedBy = ''
  dailywork: DailyModelModel [] = []

  constructor() {
  }

  ngOnInit() {

  }

  setProcessedBy(user: string) {
    this.processedBy = user;
  }

  setDailyWork(work: DailyModelModel[]) {
    this.dailywork = work;
  }

}
