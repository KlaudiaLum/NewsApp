import { Component } from '@angular/core';
import { NewsService } from 'src/service/news.service';

@Component({
  selector: 'app-root',
  template: `
  <p> NewsApp </p>
  <app-type
  *ngFor="let news of newsData"
      [newsType]="news.type"
  ></app-type>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NewsApp';
  newsData:any [] = []

  constructor(private newsService: NewsService){}
 

  ngOnInit(){
    this.fetchNews();
  }

  fetchNews(): void{
    this.newsService.getNews().subscribe((data) =>{
    this.newsData = data
    console.log('Data from api:', data);
    })
  }
}
