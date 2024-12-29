import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  authState,
  updateProfile,
  getAuth,
} from '@angular/fire/auth';
import { collection, Firestore, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  // config firebase
    private _firestore = inject(Firestore);
    private _collectionUser = collection(this._firestore, 'usersTest');

  /**
   *
   * @param user crear nuevo usuario con firebase correo
   * @returns
   */
  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
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
  //  * cerrar sesion
   */
  signOut(): Promise<void> {
    return signOut(this._auth);
  }

  /**
   * getUserAuth
   */
  getUserAuth(): Observable<any> {
    return authState;
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



  // Register a user with additional parameters
  async register(
    email: string,
    password: string,
    additionalData?: { displayName?: string; role?: string }
  ): Promise<void> {
    try {
      const userCredential: any = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );

      // Store additional user data in Firestore
      if (userCredential.user) {
        const user = userCredential.user;

        // Opcional: Actualizar el perfil del usuario
      await updateProfile(user, { displayName: 'TestCompany' });

      // Guardar datos adicionales en Firestore
      const userRef = doc(this._firestore, `users/${user.uid}`);
      await setDoc(userRef, {
        email: user.email,
        company: 'TestCompany',
        createdAt: new Date(),
      });

        // // Save user data to Firestore
        // await this._collectionUser.addDoc(uid).set({
        //   uid: uid,
        //   email: userCredential.user.email,
        //   displayName: additionalData.displayName || '',
        //   role: additionalData.role || 'user', // Default role: 'user'
        //   createdAt: new Date(),
        // });

        // Optionally update Firebase Auth profile

        // const auth = getAuth(); // Get the Auth instance
        //  const user = auth.currentUser;

        // await updateProfile(user, {
        //   createdAt: new Date(),
        //   role: 'user1'
        // });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Rethrow for component handling
    }
  }


}
