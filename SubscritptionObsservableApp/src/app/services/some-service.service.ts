import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SomeServiceService {

  private coursesSource = new BehaviorSubject<string>('eya');
  private someDataSource = new BehaviorSubject<number>(1);

  courses$ = this.coursesSource.asObservable();
  someDataSource$ = this.someDataSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getCategoriesData(): Observable<void> {
    return this.httpClient.get<any>(`http://localhost:44327/api/values/categories`)
      .pipe(map(response => {
        this.coursesSource.next(response.data[0]);

      }));
  }


  getsomeapiData(): Observable<void> {
    return this.httpClient.get<any>(`http://localhost:44327/api/values/someapi`)
      .pipe(map(response => {
        const ff = response.data;
        this.someDataSource.next(response.data[0]);
      }));
  }

  getAllDatFromCatAndSomapi(values: any): Observable<any> {
debugger;
    return this.httpClient.post('http://localhost:44327/api/values/post_me', values);
  }
}
