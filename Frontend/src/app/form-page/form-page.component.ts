import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BackendData } from '../backend-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})
export class FormPageComponent implements OnInit {
  username!: BackendData['username'];
  globalInvestments!: BackendData['investments'];
  globalAssets!: BackendData['assets'];
  globalDebt!: BackendData['debt'];
  years!: BackendData['years'];
  monthlyInvestmentContribution!: number;
  monthlyDebtPayment!: number;

  discretionaryIncome!: BackendData['discretionaryIncome'];

  constructor(private http: HttpClient, private router: Router) {}

  saveValue() {
    localStorage.setItem('years', JSON.stringify(this.years));
    //New User DB
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', this.username);
    queryParams = queryParams.append('investments', this.globalInvestments);
    queryParams = queryParams.append('debt', this.globalDebt);
    queryParams = queryParams.append('assets', this.globalAssets);
    queryParams = queryParams.append(
      'monthlyInvestmentContribution',
      this.monthlyInvestmentContribution
    );
    queryParams = queryParams.append(
      'monthlyDebtPayment',
      this.monthlyDebtPayment
    );
    queryParams = queryParams.append(
      'discretionaryIncome',
      this.discretionaryIncome
    );
    this.http
      .get<any>('http://localhost:5024/StudentLoanDB/NewUser', {
        params: queryParams,
      })
      .subscribe((response) => {
        this.router.navigate(['/signIn']);
      });
  }

  ngOnInit(): void {}
}
