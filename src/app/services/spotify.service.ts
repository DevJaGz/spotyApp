import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAlbum } from '../interfaces/album.interface';
import { IArtist } from '../interfaces/artist.interface';
import { ITrack } from '../interfaces/top-track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private urlSpotify: string = environment.spotify.url;

  constructor(private _http: HttpClient) { }

  private getQuery$(query: string, method: string = 'get'): Observable<any> {
    const url = `${this.urlSpotify}${query}`;
    return this._http.request(method, url);
  }

  getAlbumReleases$(value: number): Observable<IAlbum[]> {
    return this.getQuery$(`browse/new-releases?limit=${value}`)
      .pipe(map((data: any) => data['albums'].items));
  }

  getArtist$(id: string): Observable<IArtist> {
    return this.getQuery$(`artists/${id}`)
  }

  getTopTracks$(id: string, countryCode: string = 'us'): Observable<ITrack[]> {
    return this.getQuery$(`artists/${id}/top-tracks?country=${countryCode}`)
      .pipe(
        map(topTrack => topTrack.tracks)
      )
  }
}
