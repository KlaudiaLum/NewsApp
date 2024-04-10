import { Component, OnInit } from '@angular/core';
import { environment } from '../environment/environment';
import { NewsService } from 'src/service/news.service';
import { StopListService } from 'src/service/stop-list.service';
import { CoordinatesService } from 'src/service/coordinates.service';

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
    </app-subtitle>
    <app-stop-list [stops]="stops"></app-stop-list>
    `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NewsApp';
  newsData: any[] = [];
  mqttConfig = environment.mqtt;
  state: any;
  stops: string[] = [];
  latitude = 0;
  longitude = 0;
  coordinates: { latitude: number; longitude: number; }[] =[];


  constructor(
    private newsService: NewsService,
    private stopListService: StopListService,
    private coordinatesService: CoordinatesService
   
  ) {}

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
   * fetch coordinates
   */
  fetchCoordinates(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      const coordinates = this.coordinatesService.getCoordinates(state.stopList);
      console.log("coordinates:", coordinates);
      if (coordinates && coordinates.length >= 3) {
        this.coordinates = coordinates.slice(0, 3);
        console.log("coordinates only first 3:", this.coordinates);
      } else {
        this.coordinates = [];
      }
    } else {
      console.log('StopList is either undefined or empty');
      this.coordinates = [];
    }
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
          this.fetchStopList(state);
          this.fetchCoordinates(state);
        } else {
          console.log('Waiting for data...');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetching data:', error);
      },
    });
  }

    /**
   * get stop list
   */
    fetchStopList (state:any):void{
      const stopNames = this.stopNames(state.stopList)
      this.stops = stopNames;
      console.log("Stop names: " , stopNames)
      this.stopListService.setStops(stopNames);
      const retrievedStops = this.stopListService.getStops();
      console.log('Retrieved stops:', retrievedStops);
    }
    

    stopNames(stopList:any):any []{
      return stopList
    }
  



}
