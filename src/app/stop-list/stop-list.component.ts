import { Component, OnInit } from '@angular/core';
import { NewsData, StopData } from '../app.model';
import { NewsService } from 'src/service/news.service';
import { LibpisService } from 'src/service/libpis.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-stop-list',
  template: `
    <ng-container *ngFor="let news of newsData">
      <p-card
        *ngIf="news.title || news.type || news.description || news.imageUrl"
      >
        <ng-template pTemplate="title">
          <app-title *ngIf="news.title" [newsTitle]="news.title"></app-title>
        </ng-template>
        <ng-template pTemplate="subtitle">
          <app-subtitle
            *ngIf="news.description"
            [newsDescription]="news.description"
          ></app-subtitle>
        </ng-template>
        <ng-template pTemplate="content">
          <app-image
            *ngIf="news.imageUrl"
            [newsImage]="news.imageUrl"
          ></app-image>
        </ng-template>
        <ng-template pTemplate="footer">
          <app-type *ngIf="news.type" [newsType]="news.type"></app-type>
        </ng-template>
      </p-card>
    </ng-container>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StopListComponent implements OnInit {
  stops: StopData[] = [];
  newsData: NewsData[] = [];
  region: string | undefined;

  // TODO: Implement Blacklist
  blackList = '';

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
  }

  handleNewsData(latitude: number, longitude: number, blackList: string) {
    this.newsService
      .getNewsByCoordinates(latitude, longitude, blackList)
      .subscribe((news) => {
        this.newsData = news;
      });
  }
}
