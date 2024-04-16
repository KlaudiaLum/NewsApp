import { Component, Input, OnInit } from '@angular/core';
import { NewsData, StopData } from '../app.model';
import { NewsService } from 'src/service/news.service';
import { StopListService } from 'src/service/stop-list.service';
import { CoordinatesService } from 'src/service/coordinates.service';
import { LibpisService } from 'src/service/libpis.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss'],
})
export class StopListComponent implements OnInit {
  stops: StopData[] = [];
  newsData: NewsData[] = [];
  region: string | undefined;

  // TODO: Implement Blacklist
  blackList: string = '';

  constructor(
    private newsService: NewsService,
    private libPISService: LibpisService,
  ) {}

  ngOnInit(): void {
    this.libPISService.getState().pipe(debounceTime(1000)).subscribe((state) => {
      //const [latitude, longitude] = [state.gpsLatitude, state.gpsLongitude];

      let latitude: number;
      let longitude: number;

      const nextStopName = state.nextStop1Name;
      const nextStop = state.stopList?.find((stop) => stop.name === nextStopName)

      if (nextStop) {
        latitude = nextStop.latitude;
        longitude = nextStop.longitude;
      
        this.handleNewsData(latitude, longitude, this.blackList);
      } else {
        console.warn("Missing Coordinates in state.");
      }
    })
  }

  handleNewsData(latitude: number, longitude: number, blackList: string) {
    this.newsService.getNewsByCoordinates(latitude, longitude, blackList).subscribe((news) => {
        this.newsData = news;
    })
  }
}
