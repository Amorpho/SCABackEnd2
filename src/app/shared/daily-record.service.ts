import {HttpClient} from "@angular/common/http";
import {DailyModelModel} from "./dailyModel.model";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DailyRecord {
  constructor(private http: HttpClient) {
  }


  addRecord(record: DailyModelModel) {
    const newRecord = {
      claimNumber: record.claimNumber,
      date: new Date(),
      status: record.status,
      processedBy: record.processedBy,
      assignment: record.assignment,
      client: record.client,
      exception: record.exception,
      exception2: record.exception2,
    }
    this.http.post("http://localhost:3000/api/records", newRecord).subscribe(response => {

    })
  }

}
