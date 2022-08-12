import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BackendData } from '../backend-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css'],
})
export class SigninPageComponent implements OnInit {
  username!: BackendData['username'];
  collection!: string;
  userData!: BackendData['userData'];

  constructor(private http: HttpClient, private router: Router) {}

  getUser() {
    let username = this.username;
    let collection = 'user';
    let userData = this.userData;

    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('collection', collection);
    this.http
      .get<any>('http://localhost:5024/StudentLoanDB/GetUser', {
        params: queryParams,
      })
      .subscribe((response) => {
        this.userData = JSON.parse(JSON.stringify(response));
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.router.navigate(['/dashboard']);
      });

    console.log('user', this.username);
  }

  ngOnInit(): void {}
}
