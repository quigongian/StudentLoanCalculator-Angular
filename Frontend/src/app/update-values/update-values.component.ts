import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendData } from '../backend-data';

@Component({
  selector: 'app-update-values',
  templateUrl: './update-values.component.html',
  styleUrls: ['./update-values.component.css'],
})
export class UpdateValuesComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem('userData') as string);
  years!: number;
  investmentGrowth!: number;
  inflationDepreciation!: number;
  debtAppreciation!: number;

  constructor(private http: HttpClient) {}

  updateYears() {
    localStorage.setItem('years', JSON.stringify(this.years));
  }

  updateInvestmentGrowth() {
    let collection = 'user';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('collection', collection)
      .append('username', this.userData.username)
      .append('arguement', 'investmentGrowth')
      .append('value', this.investmentGrowth);
    this.http
      .get<any>('http://localhost:5024/StudentLoanDB/UpdateUser', {
        params: queryParams,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateInflationDepreciation() {
    let collection = 'user';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('collection', collection)
      .append('username', this.userData.username)
      .append('arguement', 'inflationDepreciation')
      .append('value', this.inflationDepreciation);
    this.http
      .get<any>('http://localhost:5024/StudentLoanDB/UpdateUser', {
        params: queryParams,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  updatedebtAppreciation() {
    let collection = 'user';
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('collection', collection)
      .append('username', this.userData.username)
      .append('arguement', 'debtAppreciation')
      .append('value', this.debtAppreciation);
    this.http
      .get<any>('http://localhost:5024/StudentLoanDB/UpdateUser', {
        params: queryParams,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnInit(): void {}
}
