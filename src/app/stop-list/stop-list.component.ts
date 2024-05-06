import { Component, OnInit } from '@angular/core';
import { NewsData, StopData } from '../app.model';
import { NewsService } from 'src/service/news.service';
import { LibpisService } from 'src/service/libpis.service';
import { throttleTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

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
          <div class="image-container">
            <div class="image-container">
              <img
                alt="Card"
                [src]="news.imageUrl ? news.imageUrl : news.logoUrl"
                [ngStyle]="{
                  'width.px': news.imageUrl ? 'auto' : '100',
                  'height.px': news.imageUrl ? 'auto' : '100'
                }"
                class="card-image"
              />
            </div>

            <img alt="logo" [src]="news.logoUrl" class="logo-img" />
          </div>

          <div class="title-wrapper">
            <span class="title-first">{{ firstPart(news.title) }}</span>
            <span class="title-divider">{{ titleDivider() }}</span>
            <span class="title-second">{{ secondPart(news.title) }}</span>
          </div>

          <p class="description">{{ news.description }}</p>
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
  localOnly = false;
  blacklistSources = '';
  currentIndex = 0;

  constructor(
    private newsService: NewsService,
    private libPISService: LibpisService,
    private route: ActivatedRoute,
  ) {}

  firstPart(title: string): string {
    if (title.includes('-')) {
      const parts = title.split('-');
      return parts[0];
    }

    return title;
  }

  secondPart(title: string) {
    let firstPart = this.firstPart(title);
    return title.substring(firstPart.length + 1);
  }

  titleDivider(): string {
    return '-';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.blacklistSources = params['blacklistSources'] || ',';
      console.log('blacklistSources:', this.blacklistSources);
      this.localOnly = params['localOnly'] === 'true';
      console.log('localOnly:', this.localOnly);
    });

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

          this.handleNewsData(
            latitude,
            longitude,
            this.blacklistSources,
            this.localOnly,
          );
        }
      });

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.newsData.length;
    }, 20000);
  }

  handleNewsData(
    latitude: number,
    longitude: number,
    blacklistSources: string,
    localOnly: boolean,
  ) {
    let params = new HttpParams();
    if (this.blacklistSources) {
      params = params.set('blackListSources', this.blacklistSources);
    }
    if (localOnly) {
      params = params.set('localOnly', 'true');
    }

    this.newsService
      .getNewsByCoordinates(latitude, longitude, localOnly, blacklistSources)
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
