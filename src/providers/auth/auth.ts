import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions}  from '@angular/http';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello AuthProvider Provider');
  }

}
