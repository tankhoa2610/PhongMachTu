import {Component, SecurityContext, OnInit, OnDestroy} from '@angular/core';
import{ AuthService } from './../../services/auth.service';
import { Bill } from './../../models/bill.model';
import { Observable } from 'rxjs';
import { Potion } from '../../models/potion.model';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: 'tooltips.component.html'
})
export class TooltipsComponent implements OnInit, OnDestroy{
  bill : Bill;
  Ten : string;
  ngayKham : string;
  tienKham : string;
  tienThuoc : string;
  CMNDBenhNhan : string;
  mySubscription: any;
  potions : Observable<Potion[]>;
  results : Observable<Potion[]>;
  dummyresults : Observable<Potion[]>;
  data: Array<Potion> = new Array<Potion>();
  sum: number;
  constructor(public billService: AuthService, private router : Router) 
  {
    this.potions = billService.potions;
    this.CMNDBenhNhan = localStorage.getItem("CMNDTemp");
    this.results = this.potions.pipe(
      map(result =>
          result.filter(one => one.CMNDbenhnhan === this.CMNDBenhNhan)
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

  ngOnInit()
  {
    this.mySubscription = this.dummyresults.subscribe(data => {
      this.data = data;
    });
  }

  getSum()
  {
    this.sum = 0;
    for (var i = 0; i < this.data.length; i++) 
    {
      this.sum += (parseInt(this.data[i].giaTien ) * parseInt(this.data[i].soLuongDung ));
    }
    return this.sum;
  }

  pressGo()
  { 
    this.router.navigate(['base/tooltips']);
    localStorage.setItem("CMNDTemp", this.CMNDBenhNhan);
  }

  onSubmit(){
    this.bill = new Bill();
    this.bill.Ten = this.Ten;
    this.bill.ngayKham = this.ngayKham;
    this.bill.tienKham = this.tienKham;
    this.bill.tienThuoc = this.getSum() + "";
    this.billService.createBill(this.bill);
  }

  onReset(){
    this.Ten = "";
    this.ngayKham = "";
    this.CMNDBenhNhan = "";
  }

  ngOnDestroy() {
    if (this.mySubscription) 
    {
      this.mySubscription.unsubscribe();
    }
  }
}
