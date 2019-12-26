import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Patient } from './../../models/patient.model'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service'
import { filter, map, isEmpty } from 'rxjs/operators'; 
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  templateUrl: 'tables.component.html',
})

export class TablesComponent implements OnDestroy{
  mySubscription: any;
  patients : Observable<Patient[]>;
  results : Observable<Patient[]>;
  constructor(patientsService : AuthService, private router : Router,  private changeDetectorRefs: ChangeDetectorRef) { 
    this.patients = patientsService.patients;
    this.ngayKham = localStorage.getItem("ngayKham");
    this.results = this.patients.pipe(
    map(result =>
        result.filter(one => one.ngayKham === this.ngayKham)
    ));
    
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

  pressGo()
  {
    this.router.navigate(['base/tables']);
    localStorage.setItem("ngayKham", this.ngayKham);
  }

ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
  }
}
