import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormPageComponent } from './form-page/form-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { UpdateValuesComponent } from './update-values/update-values.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormPageComponent,
    SigninPageComponent,
    UserDashboardComponent,
    UpdateValuesComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'signIn', component: SigninPageComponent },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'form', component: FormPageComponent },
      { path: 'update', component: UpdateValuesComponent },
      { path: 'stats', component: StatisticsComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
