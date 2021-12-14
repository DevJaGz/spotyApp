import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { IUser } from '../interfaces/user.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser = {} as IUser;

  constructor(public afAuth: AngularFireAuth, private _http: HttpClient) {

    afAuth.authState.subscribe(async (user) => {
      console.log('estado del usuario', user);
      if (!user) {
        return;
      }

      this.user.uid = user.uid;
      this.user.nombre = user.displayName;
      this.user.email = user.email
      // const userToken: string = await this.getFireBaseUserToken(user)
      // this.saveSessionStorage('token', userToken);
    })

  }

  getSpotifyToken$(): Observable<{ access_token: string, token_type: string, expires_in: number }> {
    let body = new URLSearchParams();
    body.set('grant_type', environment.spotify.grant_type);
    body.set('client_id', environment.spotify.client_id);
    body.set('client_secret', environment.spotify.client_secret);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post<{ access_token: string, token_type: string, expires_in: number }>(environment.spotify.urlToken, body, { headers })
  }

  readSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  saveSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  deleteSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  async getFireBaseUserToken(user: firebase.User): Promise<string> {
    const token = await user.getIdToken();
    return token
  }

  logout() {
    this.user = {} as IUser;
    this.deleteSessionStorage('token');
    return this.afAuth.signOut();
  }

  loginGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmailPass(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  userInSession() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid)
        } else {
          reject(Error('No user authenticated'))
        }
      })
    })
  }

  fetchEmail(email: string) {
    return this.afAuth.fetchSignInMethodsForEmail(email);
  }

  // this.afAuth.createUserWithEmailAndPassword()
}
