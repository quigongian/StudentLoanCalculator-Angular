import { Component, OnInit } from '@angular/core';
import { BackendData } from '../backend-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem('userData') as string);
  minimumLoanData!: BackendData['minimumLoanData'];

  constructor(private http: HttpClient) {}

  //Pie Chart
  public chartOptions: any = {
    title: {
      text: 'Overview',
    },
    series: [
      {
        type: 'pie',
        name: this.userData.username,
        data: [
          { name: 'Investments', y: this.userData.investments },
          { name: 'Assets', y: this.userData.assets },
          { name: 'Debt', y: this.userData.debt },
          { name: 'Investment Growth', y: this.userData.investmentGrowth },
          {
            name: 'Inflation Depreciation',
            y: this.userData.inflationDepreciation,
          },
          { name: 'Debt Appreciation', y: this.userData.debtAppreciation },
        ],
      },
    ],
  };
  //

  displayChart() {}

  displayNetworth() {}

  displayMinimumLoanPayment() {
    let queryParams2 = new HttpParams();
    queryParams2 = queryParams2.append('rate', this.userData.debtAppreciation);
    queryParams2 = queryParams2.append('loanAmount', this.userData.debt);
    queryParams2 = queryParams2.append('years', 5);
    this.http
      .get<any>('http://localhost:5024/StudentLoanCalculator/MinLoanPayment', {
        params: queryParams2,
      })
      .subscribe((response) => {
        this.minimumLoanData = JSON.parse(JSON.stringify(response));
      });
  }

  ngOnInit(): void {
    Highcharts.chart('container2', this.chartOptions);
  }
}
