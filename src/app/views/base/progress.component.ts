import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Bill } from './../../models/bill.model'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service'
import { filter, map, isEmpty } from 'rxjs/operators'; 
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Router, NavigationEnd } from '@angular/router';
import { Medicine } from './../../models/medicine.model'


@Component({
  templateUrl: 'progress.component.html',
})

export class ProgressComponent implements OnInit, OnDestroy{
  mySubscription: any;
  bills : Observable<Bill[]>;
  results : Observable<Bill[]>;
  medicines : Observable<Medicine[]>;
  dummyresults : Observable<Bill[]>;
  sum : number = 0;
  num : number = 0;
  data: Array<Bill> = new Array<Bill>();
  constructor(patientsService : AuthService, private router : Router,  private changeDetectorRefs: ChangeDetectorRef) { 
    this.bills = patientsService.bills;
    this.medicines = patientsService.medicines;
    this.ngayKham = localStorage.getItem("ngayKhamBill");
    this.results = this.bills.pipe(
    map(result =>
        result.filter(one => one.ngayKham === this.ngayKham)
    ));
    this.dummyresults = this.results;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }  
  ngayKham : string;

  ngOnInit()
  {
    this.mySubscription = this.dummyresults.subscribe(data => {
      this.data = data;
    });
  }

  pressGo()
  { 
    this.router.navigate(['base/progress']);
    localStorage.setItem("ngayKhamBill", this.ngayKham);
  }

  getSum()
  {
    this.sum = 0;
    for (var i = 0; i < this.data.length; i++) 
    {
      this.sum += (parseInt(this.data[i].tienKham) + parseInt(this.data[i].tienThuoc));
    }
    return this.sum;
  }

  getNum()
  {
    this.num = 0;
    for (var i = 0; i < this.data.length; i++) 
    {
      this.num += 1;
    }
    return this.num;
  }

  ngOnDestroy() {
  if (this.mySubscription) 
  {
    this.mySubscription.unsubscribe();
  }
}
}
