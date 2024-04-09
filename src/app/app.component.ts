import { Component } from '@angular/core';
import { NewsService } from 'src/service/news.service';
import { RouterOutlet } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  template: `
    <p>NewsApp</p>
    <app-titile
      *ngFor="let news of newsData"
      [newsTitle]="news.title"
    ></app-titile>
  `,
})

export class AppComponent {
  title = 'NewsApp';
  newsData: any[] = [];
  mqttConfig = environment.mqtt;
  state: any;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.fetchNews();
    this.initConnection();
  }
  fetchNews(): void {
    this.newsService.getNews().subscribe((data) => {
      this.newsData = data
      console.log('Data from api:', data);
    })
  }

  // connectet libpis with mqtt broker
  initConnection() {
    if (window.luminator && window.luminator.pis) {
      window.luminator.pis.init(this.mqttConfig);
  
      window.luminator.pis.client.updates().subscribe({
        next: (state: any) => {
          if (state) {
            console.log('LibPis ', state);
          } else {
            console.log('Waiting for data...');
          }
        },
        error: (error: any) => {
          console.error('Error occurred while fetching data:', error);
        },
      });
    } else {
      console.error('luminator or pis is not defined');
    }
  }

}
