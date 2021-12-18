import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerpApiService {

  private urlSerpApi = environment.serpApi.url;
  private apiKey = environment.serpApi.key;

  constructor(private _http: HttpClient) { }

  private getQuery$(query: string, method: string = 'get'): Observable<any> {
    const url = `${this.urlSerpApi}${query}`;
    return this._http.request(method, url);
  }


  getImage$(target: string): Observable<any[]> {
    const params = new HttpParams();
    params.append('q', target);
    params.append('ijn', 0);
    params.append('tbm', "isch");
    params.append('api_key', this.apiKey);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
    return this._http.get(this.urlSerpApi, { headers, params })
      .pipe(map((data: any) => data['images_results']));
  }

}
