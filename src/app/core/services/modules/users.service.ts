import { inject, Injectable } from '@angular/core';
import { collectionData, doc, Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // config firebase
  private _firestore = inject(Firestore);
  private _collectionUser = collection(this._firestore, 'usersTest');


  // metodos 
  getUsers(): Observable<any[]> {
    return collectionData(this._collectionUser);
  }


  getFilteredDataUsers(field: string, value: any): Observable<any[]> {
    const filteredQuery = query(this._collectionUser, where(field, '==', value));
    return collectionData(filteredQuery, {UID: 'UID'});
  }


}
