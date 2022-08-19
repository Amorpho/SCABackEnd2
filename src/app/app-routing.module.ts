import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {DailyTrackerComponent} from "./components/daily-tracker/daily-tracker.component";
import {InfoComponent} from "./components/info/info.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {EditComponent} from "./components/settings/editUser/edit.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'dailyTracker', component: DailyTrackerComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'info', component: InfoComponent},
      {
        path: 'settings', component: SettingsComponent, children: [
          {path: 'edit/:id', component: EditComponent}
        ]
      }
    ]
  },
  {path: '**', redirectTo: 'home/dailyTracker', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
