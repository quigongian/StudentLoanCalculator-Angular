import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendData } from '../backend-data';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem('userData') as string);
  years = JSON.parse(localStorage.getItem('years') as string);
  minimumLoanData!: BackendData['minimumLoanData'];
  zeroBalanceData!: BackendData['zeroBalanceDate'];
  networthData!: BackendData['networthData'];
  networthData2!: BackendData['networthData'];
  networthData3!: BackendData['networthData'];
  networthData4!: BackendData['networthData'];
  monthlyInvestmentData!: BackendData['monthlyInvestmentData'];

  constructor(private http: HttpClient) {}

  //Line Graph
  chartOptions: any = {
    title: {
      text: 'Networth Comparison',
    },
    series: [
      {
        name: 'Optimal Networth',
        turboThreshold: 500000,
        data: [],
      },
      {
        name: 'Optimal Outstanding Balance',
        turboThreshold: 500000,
        data: [],
      },
      {
        name: 'Networth',
        turboThreshold: 500000,
        data: [],
      },
      {
        name: 'Outstanding Balance',
        turboThreshold: 500000,
        data: [],
      },
    ],
  };
  //

  minimumLoanPayment() {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('rate', this.userData.debtAppreciation)
      .append('loanAmount', this.userData.debt)
      .append('years', this.years);
    this.http
      .get<any>('http://localhost:5024/StudentLoanCalculator/MinLoanPayment', {
        params: queryParams,
      })
      .subscribe((response) => {
        this.minimumLoanData = JSON.parse(JSON.stringify(response));
        console.log(this.minimumLoanData);
      });
  }

  zeroBalanceDate() {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('loanAmount', this.userData.debt)
      .append('monthlyPayment', this.userData.monthlyDebtPayment)
      .append('interestRate', this.userData.debtAppreciation);
    this.http
      .get<any>('http://localhost:5024/StudentLoanCalculator/ZeroBalanceDate', {
        params: queryParams,
      })
      .subscribe((response) => {
        this.zeroBalanceData = JSON.parse(JSON.stringify(response));
        console.log(this.zeroBalanceData);
      });
  }

  averageNetworth() {
    this.monthlyInvestmentData =
      this.userData.discretionaryIncome - this.minimumLoanData;
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('username', this.userData.username)
      .append('years', this.years)
      .append('investments', this.userData.investments)
      .append('assets', this.userData.assets)
      .append('monthlyInvestmentContribution', this.monthlyInvestmentData)
      .append('debt', this.userData.debt)
      .append('monthlyDebtPayment', this.minimumLoanData);
    this.http
      .get<any>('http://localhost:5024/StudentLoanCalculator/NetWorth', {
        params: queryParams,
      })
      .subscribe((response) => {
        this.networthData = JSON.parse(JSON.stringify(response.netWorthArray));
        this.networthData2 = JSON.parse(
          JSON.stringify(response.outstandingBalanceArray)
        );
        this.chartOptions.series[0]['data'] = this.networthData;
        this.chartOptions.series[1]['data'] = this.networthData2;
        console.log(this.networthData);
      });

    let queryParams2 = new HttpParams();
    queryParams2 = queryParams2
      .append('username', this.userData.username)
      .append('years', this.years)
      .append('investments', this.userData.investments)
      .append('assets', this.userData.assets)
      .append(
        'monthlyInvestmentContribution',
        this.userData.monthlyInvestmentContribution
      )
      .append('debt', this.userData.debt)
      .append('monthlyDebtPayment', this.userData.monthlyDebtPayment);
    this.http
      .get<any>('http://localhost:5024/StudentLoanCalculator/NetWorth', {
        params: queryParams2,
      })
      .subscribe((response) => {
        this.networthData3 = JSON.parse(JSON.stringify(response.netWorthArray));
        this.networthData4 = JSON.parse(
          JSON.stringify(response.outstandingBalanceArray)
        );
        this.chartOptions.series[2]['data'] = this.networthData3;
        this.chartOptions.series[3]['data'] = this.networthData4;
        console.log(this.networthData);
      });
    Highcharts.chart('container2', this.chartOptions);
  }
  ngOnInit(): void {}
}
