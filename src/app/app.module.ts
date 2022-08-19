import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {ToastrModule} from "ngx-toastr";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatExpansionModule} from "@angular/material/expansion";

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ReportsComponent} from './components/reports/reports.component';
import {DailyTrackerComponent} from './components/daily-tracker/daily-tracker.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceFirebaseService} from "./shared/service-firebase.service";
import {DailyreportComponent} from './components/reports/dailyreport/dailyreport.component';
import {environment} from '../environments/environment';
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth-guard.service";
import {FilterPipePipe} from "./shared/filtro.pipe";
import {DailyService} from "./shared/daily.service";
import {InfoComponent} from './components/info/info.component';
import {SettingsComponent} from "./components/settings/settings.component";
import {UserComponent} from "./components/settings/user/user.component";
import {NewUserComponent} from "./components/settings/newUser/newUser.component";
import {EditComponent} from "./components/settings/editUser/edit.component";
import { EditExceptionsComponent } from './components/settings/edit-exceptions/edit-exceptions.component';
import {EditAssignmentComponent} from "./components/settings/edit-assignments/edit-assignment.component";
import { InfoExceptionsComponent } from './components/settings/info-exceptions/info-exceptions.component';
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ReportsComponent,
    DailyTrackerComponent,
    DailyreportComponent,
    FilterPipePipe,
    InfoComponent,
    SettingsComponent,
    UserComponent,
    NewUserComponent,
    EditComponent,
    EditExceptionsComponent,
    EditAssignmentComponent,
    InfoExceptionsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        ScrollingModule,
        MatButtonToggleModule,
        MatCardModule,
        MatIconModule,
        HttpClientModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        MatDividerModule,
        MatToolbarModule,
        MatStepperModule,
        MatMenuModule,
        MatExpansionModule,
        MatTooltipModule,
        NgChartsModule,

    ],
  providers: [ServiceFirebaseService, AuthService, AuthGuard, DailyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
