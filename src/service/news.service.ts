import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NewsData } from 'src/app/app.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.apiBasePath;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsData[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<NewsData[]>(url);
  }

  getNewsByCoordinates(
    latitude: number,
    longitude: number,
    localOnly: boolean,
    blacklistSources: string,
  ): Observable<NewsData[]> {
    let params = new HttpParams()
      .set('lon', longitude.toString())
      .set('lat', latitude.toString())
      .set('localOnly', localOnly ? 'true' : 'false');

    if (blacklistSources) {
      params = params.set('blacklistSources', blacklistSources);
    }
    const url = `${this.apiUrl}`;
    return this.http.get<NewsData[]>(url, { params });
  }
}
