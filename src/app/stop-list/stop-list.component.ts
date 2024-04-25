import { Component, OnInit } from '@angular/core';
import { NewsData, StopData } from '../app.model';
import { NewsService } from 'src/service/news.service';
import { LibpisService } from 'src/service/libpis.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-stop-list',
  template: `
    <ng-container *ngFor="let news of newsData; let i = index">
      <div
        class="card-container"
        [ngClass]="getBackgroundColor(news.type.toLowerCase())"
        *ngIf="i === currentIndex"
      >
        <div class="news-wrapper">
          <p>{{ news.type }}</p>
          <div class="image-container">
            <img alt="Card" [src]="news.imageUrl" class="card-image" />
            <div>
              <h3>{{ news.title }}</h3>
              <p>{{ news.description }}</p>
            </div>
          </div>
        </div>

        <div class="qr-wrapper">
          <qrcode
            [qrdata]="news.url"
            [width]="256"
            [errorCorrectionLevel]="'M'"
          ></qrcode>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StopListComponent implements OnInit {
  stops: StopData[] = [];
  newsData: NewsData[] = [];
  region: string | undefined;

  blackList = '';
  currentIndex = 0;

  constructor(
    private newsService: NewsService,
    private libPISService: LibpisService,
  ) {}

  ngOnInit(): void {
    this.libPISService
      .getState()
      .pipe(throttleTime(10000))
      .subscribe((state) => {
        let latitude: number;
        let longitude: number;

        const nextStopName = state.nextStop1Name;
        const nextStop = state.stopList?.find(
          (stop) => stop.name === nextStopName,
        );

        if (!nextStop) {
          console.warn('Missing Coordinates in state.');
        }

        if (nextStop) {
          latitude = nextStop.latitude;
          longitude = nextStop.longitude;

          this.handleNewsData(latitude, longitude, this.blackList);
        }
      });

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.newsData.length;
    }, 20000);
  }

  handleNewsData(latitude: number, longitude: number, blackList: string) {
    this.newsService
      .getNewsByCoordinates(latitude, longitude, blackList)
      .subscribe((news) => {
        this.newsData = news;
        console.log('News', this.newsData);
      });
  }

  getBackgroundColor(type: string): string {
    switch (type) {
      case 'local':
        return 'local-bg';
      case 'national':
        return 'national-bg';
      case 'international':
        return 'international-bg';
      default:
        return '';
    }
  }
}
