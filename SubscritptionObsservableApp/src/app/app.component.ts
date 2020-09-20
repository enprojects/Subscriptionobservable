import { Observable, combineLatest } from 'rxjs';
import { SomeServiceService } from './services/some-service.service';

import { Component, OnInit } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SubscritptionObsservableApp';

  courses$: Observable<string>;
  someDataSource$: Observable<number>;


  constructor(private someServiceService: SomeServiceService) {
    this.courses$ = this.someServiceService.courses$;
    this.someDataSource$ = this.someServiceService.someDataSource$;
  }
  ngOnInit(): void {


    combineLatest(
      this.courses$,
      this.someDataSource$).pipe(switchMap(_ => {
        debugger;
        return this.someServiceService.getAllDatFromCatAndSomapi({ valInt: _[1], valStr: _[0] });

      })).subscribe(x => {
     debugger;
        console.log(x);
      });

    // .subscribe(res => {


    //   let ff  = res;
    // });
  }


  do1(): void {

    this.someServiceService.getCategoriesData().subscribe();
  }

  do2(): void {

    this.someServiceService.getsomeapiData().subscribe();
  }


}
