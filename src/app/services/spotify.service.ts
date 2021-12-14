import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http: HttpClient) { }

  getQuery$(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    return this._http.get(url);
  }

  getNewReleases$() {
    return this.getQuery$('browse/new-releases?limit=20')
      .pipe(map((data: any) => data['albums'].items));
  }


}
