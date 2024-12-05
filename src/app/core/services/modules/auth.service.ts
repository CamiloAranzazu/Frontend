import {
  HttpClient,
  HttpParameterCodec,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

export interface User {
  email: string; 
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _auth = inject(Auth);

  /**
   * 
   * @param user crear nuevo usuario con firebase correo
   * @returns 
   */
  signUp(user: User) {
    return createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }

  /**
   * 
   * @param user inicio de sesion con firebase correo
   * @returns 
   */
  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  /**
   * @param user inicio de sesion con firebase GMAIL
   * @returns 
   */
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    // ESta linea fuerza a google a seleccionar una cuenta
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this._auth, provider);
  }


}