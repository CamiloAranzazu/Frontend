import { inject, Injectable } from '@angular/core';
import { collectionData, doc, Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrudCommonFirebaseService {
  // config firebase
  private _firestore = inject(Firestore);


  // Leer documentos con una consulta específica
  async getFilteredDocuments(collectionName: string, field: string, value: any) {
    const collectionRef = collection(this._firestore, collectionName);
    const q = query(collectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // Agregar un nuevo documento
  async addDocument(collectionName: string, data: any) {
    const collectionRef = collection(this._firestore, collectionName);
    return await addDoc(collectionRef, data);
  }

  // Actualizar un documento
  async updateDocument(collectionName: string, documentId: string, data: any) {
    const docRef = doc(this._firestore, `${collectionName}/${documentId}`);
    return await updateDoc(docRef, data);
  }

  // Eliminar un documento
  async deleteDocument(collectionName: string, documentId: string) {
    const docRef = doc(this._firestore, `${collectionName}/${documentId}`);
    return await deleteDoc(docRef);
  }

}
