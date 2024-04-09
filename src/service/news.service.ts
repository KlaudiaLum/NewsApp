import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = environment.apiBasePath
  constructor(private http:HttpClient) { }

  getNews(): Observable<any>{
    const url = `${this.apiUrl}`
    return this.http.get(url)
  }
}