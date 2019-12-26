import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { Patient } from './../../models/patient.model'
import { Potion } from './../../models/potion.model'
import { Medicine } from './../../models/medicine.model'
import { Observable } from 'rxjs';
@Component({
  templateUrl: 'forms.component.html',
  providers:[AuthService],
})
export class FormsComponent{
  medicines : Observable<Medicine[]>;
  constructor( public patientService: AuthService, private router: Router) { 
    this.medicines = patientService.medicines;
  }
  patient : Patient;
  medicine : Medicine;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  Ten : string;
  CMND : string;
  SDT : string;
  diaChi : string;
  ngayKham : string;
  trieuChung : string;
  duDoan : string;
  thuocGiaTien : string;
  donVi: string;
  potions: Potion[] = [];
  potion: Potion;
  soLuongDung: string;
  cachDung: string;
  gioiTinh : string;
  baoHiem : string;
  giaTien: string;
  id : string;
  tenThuoc : string;

  
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onSubmit(){
    this.patient = new Patient();
    this.patient.Ten = this.Ten;
    this.patient.CMND = this.CMND;
    this.patient.SDT = this.SDT;
    this.patient.diaChi = this.diaChi;
    this.patient.ngayKham = this.ngayKham;
    this.patient.trieuChung = this.trieuChung;
    this.patient.duDoan = this.duDoan;
    this.patient.gioiTinh = this.gioiTinh;
    this.patient.baoHiem = this.baoHiem;
    this.patientService.createPatient(this.patient)
  }

  onAdd(){
    this.tenThuoc = this.thuocGiaTien.substring(0, this.thuocGiaTien.indexOf('-'))
    this.donVi = this.thuocGiaTien.substring(this.thuocGiaTien.indexOf('-') + 1, this.thuocGiaTien.indexOf('_'));
    this.giaTien = this.thuocGiaTien.substring(this.thuocGiaTien.indexOf('_') + 1, this.thuocGiaTien.indexOf('.'));
    this.potion = new Potion();
    this.potion.tenThuoc = this.tenThuoc;
    this.potion.soLuongDung = this.soLuongDung;
    this.potion.cachDung = this.cachDung;
    this.potion.CMNDbenhnhan = this.CMND;
    this.potion.donVi = this.donVi;
    this.potion.giaTien = this.giaTien;
    this.patientService.createPotion(this.potion);
    this.id = this.tenThuoc + "-" + this.donVi;
    this.patientService.updateMedicine(this.id, this.soLuongDung);
    alert("Added " + this.thuocGiaTien);
  }

  onReset(){
    this.Ten = "";
    this.CMND = "";
    this.SDT = "";
    this.diaChi = "";
    this.ngayKham = "";
    this.trieuChung = "";
    this.duDoan = "";
    this.thuocGiaTien = "";
    this.donVi = "";
    this.soLuongDung = "";
    this.cachDung = "";
    this.gioiTinh = "Nam";
  }
}
