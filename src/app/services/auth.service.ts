import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { User } from '../model/user-type.data';
import { doc, getDoc } from 'firebase/firestore';

import * as FirebaseUser from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseService = inject(FirebaseService);

  user = signal<User | null>(null);

  constructor() {
    //Initiate an observer
    onAuthStateChanged(this.firebaseService.auth, async (authUser) => {
      if (!authUser) {
        this.user.set(null);
        console.log('Just set user to null');
        return;
      }
      console.log(authUser.uid);
      const user = await this.getUserInfo(authUser.uid);

      this.user.set(user);
      console.log('Just set user to user');
    });
  }

  async getAuthState(): Promise<FirebaseUser.User | null> {
    await this.firebaseService.auth.authStateReady();
    return Promise.resolve(this.firebaseService.auth.currentUser);
  }

  async getUserInfo(uid: string): Promise<User | null> {
    console.log('we are in getUserInfo');
    const userRef = doc(this.firebaseService.db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('User doc does not exist');
      return null;
    }
    console.log('User doc data:', userDoc.data());
    return userDoc.data() as User;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.firebaseService.auth,
      email,
      password
    );
  }

  logout() {
    return signOut(this.firebaseService.auth);
  }
}
