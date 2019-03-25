import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firesore: AngularFirestore) { }

  update(ref: string, value: any) {
    this.firesore.doc(ref).update(value);
  }

  dateNow(): firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.fromDate(new Date());
  }
}
