import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { NewsData} from 'src/app/app.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
 private apiUrl = environment.apiBasePath

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsData[]>{
    const url = `${this.apiUrl}`;
    return this.http.get<NewsData[]>(url);
  }

  getNewsCoordinats(latitude: number, longitude: number, blacklistSources:any): Observable<any> {
    const url = `${this.apiUrl}?lon=${longitude}&lat=${latitude}&blacklistSources=${blacklistSources}`;
    return this.http.get(url);
  }
}
