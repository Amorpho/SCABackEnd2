import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {DailyModelModel} from "./dailyModel.model";
import {UserModel} from "./user.model";
import {ClientGroup} from "./clien-group.model";
import {Exceptions} from "./exceptions.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService implements OnInit {

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit() {

  }


  getUserProfile(id: string) {
    return this.firestore.collection('users').doc(id).get();
  }

  addCompanyGroup(group: ClientGroup): Promise<any> {
    return this.firestore.collection('companyGroup').add(group)
  }

  delCompanyGroup(id: string): Promise<any> {
    return this.firestore.collection('companyGroup').doc(id).delete()
  }

  getAllCompanyGroups(): Observable<any> {
    return this.firestore.collection('companyGroup').snapshotChanges()
  }

  addException(exception: Exceptions): Promise<any> {
    return this.firestore.collection('exceptions').add(exception)
  }

  delException(id: string): Promise<any> {
    return this.firestore.collection('exceptions').doc(id).delete()
  }

  getAllExceptions(): Observable<any> {
    return this.firestore.collection('exceptions', ref => ref.orderBy('description', 'desc')).snapshotChanges()
  }

  addNewrecord(record: DailyModelModel): Promise<any> {
    return this.firestore.collection('records').add(record);
  }

  addNewUser(user: UserModel) {
    return this.firestore.collection('users').add(user);
  }

  delUser(id: any): Promise<any> {
    return this.firestore.collection('users').doc(id).delete();
  }

  getAllUsers(): Observable<any> {
    return this.firestore.collection('users').snapshotChanges()
  }

  getUser(userName: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('userName', '==', userName)).snapshotChanges();
  }

  getRecords(start: Date): Observable<any> {
    let startDate = new Date(start)
    let timeinmili = start.getTime();
    let hoursInmili = (start.getHours() * (60 * 60000))   // hours in mili;
    hoursInmili = hoursInmili - (start.getMinutes() * 60000)   // hours in mili;
    let newToday = new Date(timeinmili - hoursInmili)
    let endDate = new Date(newToday.getTime() + (23 * 60 * 60000))

    return this.firestore.collection('records', ref => ref
      .where('date', '>', newToday)
      .where('date', '<', endDate)
      .orderBy('date', 'desc')).snapshotChanges();
  }

  updateRecord(id: any, record: DailyModelModel): Promise<any> {
    return this.firestore.collection('records').doc(id).update(record)
  }

  deleteRecord(id: any): Promise<any> {
    return this.firestore.collection('records').doc(id).delete()
  }

  getAllRecords(): Observable<any> {
    let startDate = new Date()
    let timeinmili = startDate.getTime();
    let hoursInmili = (startDate.getHours() * (60 * 60000))   // hours in mili;
    hoursInmili = hoursInmili - (startDate.getMinutes() * 60000)   // hours in mili;
    let newToday = new Date(timeinmili - hoursInmili)
    let endDate = new Date(newToday.getTime() + (23 * 60 * 60000))

    return this.firestore.collection('records', ref => ref
      .where('date', '>', newToday)
      .where('date', '<', endDate)
      .orderBy('date', 'desc')).snapshotChanges();
  }

  getReport(startDate: Date, endDate: Date): Observable<any> {
    let endayMili = (endDate.getTime() + (86400000)) ;
    let enday = new Date(endayMili)
    return this.firestore.collection('records', ref => ref
      .where('date', '>', startDate)
      .where('date', '<', enday)
      .orderBy('date', 'desc')).snapshotChanges();
  }

  getReports(): Observable<any> {

    return this.firestore.collection('records').snapshotChanges();
  }


}
