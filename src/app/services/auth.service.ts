import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup } from "@angular/forms";
import { Patient } from '../models/patient.model'
import { Bill } from '../models/bill.model'
import { Potion } from '../models/potion.model'
import { Medicine } from '../models/medicine.model'
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  patientsRef: AngularFirestoreCollection<Patient>;
  billsRef: AngularFirestoreCollection<Bill>;
  potionsRef: AngularFirestoreCollection<Potion>;
  medicinesRef: AngularFirestoreCollection<Medicine>;
  chartsRef: AngularFirestoreCollection<Chart>;
  patients : Observable<Patient[]>;
  bills: Observable<Bill[]>;
  potions: Observable<Potion[]>;
  medicines: Observable<Medicine[]>;
  item : Observable<Medicine>;
  private userDetails: firebase.User = null;
constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) { 
      this.user = _firebaseAuth.authState;
      this.patientsRef = db.collection<Patient>('patientList');
      this.billsRef = db.collection<Bill>('billList');
      this.potionsRef = db.collection<Potion>('potionList')
      this.medicinesRef = db.collection<Medicine>('medicineList')
      this.patients = this.patientsRef.valueChanges();
      this.bills = this.billsRef.valueChanges();
      this.potions = this.potionsRef.valueChanges();
      this.medicines = this.medicinesRef.valueChanges();

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }
  
  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
 }

 isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

  createPatient(patient : Patient) {
    this.patientsRef.add(Object.assign(JSON.parse(JSON.stringify(patient))))
    .then 
    alert("Added");
}

  createBill(bill : Bill) {
    this.billsRef.add(Object.assign(JSON.parse(JSON.stringify(bill))))
    .then 
    alert("Added");
}
  createPotion(potion : Potion) {
    this.potionsRef.add(Object.assign(JSON.parse(JSON.stringify(potion))))
    .then 
    //alert("Added");
}
  deletePotion(name : string) {
  this.potionsRef.doc(name).delete();
}

  createMedicine(medicine : Medicine) {
  this.medicinesRef.add(Object.assign(JSON.parse(JSON.stringify(medicine))))
  .then 
  alert("Added");
}

updateMedicine(name : string, number : string) {
  this.medicinesRef.doc(name).update({ soLanSuDung : number});
}
}