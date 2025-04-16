import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyARlriV3K7nr6yt44aWC6--6Fb2ULt0q1Q',
  authDomain: 'weather-app-25979.firebaseapp.com',
  projectId: 'weather-app-25979',
  storageBucket: 'weather-app-25979.firebasestorage.app',
  messagingSenderId: '676012170813',
  appId: '1:676012170813:web:7494d2509f87821fd95454',
  measurementId: 'G-SHQ1S8DP7D',
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app = initializeApp(firebaseConfig);
  get app() {
    return this._app;
  }

  private _auth = getAuth(this._app);
  get auth() {
    return this._auth;
  }

  private _db = getFirestore(this._app);
  get db() {
    return this._db;
  }
  constructor() {}
}
