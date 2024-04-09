import { Component, OnInit } from '@angular/core';
import { environment } from '../environment/environment';
import { NewsService } from 'src/service/news.service';

@Component({
  selector: 'app-root',
  template: ` <p>NewsApp</p>
    <app-type *ngFor="let news of newsData" [newsType]="news.type"> </app-type>

    <app-titile *ngFor="let news of newsData" [newsTitle]="news.title">
    </app-titile>

    <app-subtitle
      *ngFor="let news of newsData"
      [newsDescription]="news.description"
    >
    </app-subtitle>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NewsApp';
  newsData: any[] = [];
  constructor(private newsService: NewsService) {}
  mqttConfig = environment.mqtt;
  state: any;

  ngOnInit(): void {
    this.initConnection();
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe((data) => {
      this.newsData = data;
      console.log('Data from api:', data);
    });
  }

  /**
   * Connec LibPIS with MQTT broker
   */
  initConnection() {
    if (!window.luminator.pis) {
      console.error('luminator or pis is not defined');
    }

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
  }
}
