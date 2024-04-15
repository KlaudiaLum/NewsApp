import { Component, Input } from '@angular/core';
import { NewsData, StopData } from '../app.model';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss'],
})
export class StopListComponent {
  @Input() stops: StopData[] = [];
  @Input() newsData: NewsData[] = [];
  displayedStop: StopData | null = null;

  
  ngOnChanges() {
    this.updateDisplayedStop();
  }

  updateDisplayedStop() {
    if (this.stops && this.stops.length > 0) {
      // Find the first matching stop
      const currentStop = this.stops.find((stop) => this.isCurrentStop(stop));
      this.displayedStop = currentStop || null;
      console.log('this.displayedStop' , this.displayedStop)
    } else {
      this.displayedStop = null;
    }
  }

  isCurrentStop(stop: any): boolean {
    const differenceInMinutes = this.getMinutesRemaining(
      stop.expectedArrivalTime,
    );
    return differenceInMinutes > 0 && differenceInMinutes < 60; // Show the stop if it arrives within the next 60 minutes
  }

  calculateArrivalTime(expectedArrivalTime: string): string {
    if (!expectedArrivalTime) {
      return '--';
    }

    const differenceInMinutes = this.getMinutesRemaining(expectedArrivalTime);

    return differenceInMinutes < 0
      ? 'Already arrived'
      : `${differenceInMinutes} min`;
  }

  getMinutesRemaining(expectedArrivalTime: string): number {
    if (!expectedArrivalTime) {
      return 0;
    }

    const arrivalTime = new Date();
    const [hours, minutes] = expectedArrivalTime.split(':').map(Number);
    arrivalTime.setHours(hours);
    arrivalTime.setMinutes(minutes);

    const currentTime = new Date();
    const differenceInMinutes = Math.round(
      (arrivalTime.getTime() - currentTime.getTime()) / (1000 * 60),
    );

    return differenceInMinutes;
  }

  // Print the news
  getTitleForStop(stop: any): { title: string }[] {
    console.log('Stops', stop)
    console.log('this.newsData', this.newsData)
    const newsForStop = this.newsData.find(
      (news) =>
        news &&
        news.latitude === stop.latitude &&
        news.longitude === stop.longitude,
    );
    if (newsForStop && Array.isArray(newsForStop.data)) {
      return newsForStop.data.map((item: any) => ({ title: item.title }));
    } else {
      return [];
    }
  }

  getSubtitleForStop(stop: any): { description: string }[] {
    const newsForStop = this.newsData.find(
      (news) =>
        news &&
        news.latitude === stop.latitude &&
        news.longitude === stop.longitude,
    );
    if (newsForStop && Array.isArray(newsForStop.data)) {
      return newsForStop.data.map((item: any) => ({
        description: item.description,
      }));
    } else {
      return [];
    }
  }

  getTypeForStop(stop: any): { type: string }[] {
    const newsForStop = this.newsData.find(
      (news) =>
        news &&
        news.latitude === stop.latitude &&
        news.longitude === stop.longitude,
    );
    if (newsForStop && Array.isArray(newsForStop.data)) {
      return newsForStop.data.map((item: any) => ({ type: item.type }));
    } else {
      return [];
    }
  }

  getImageForStop(stop: any): { imageUrl: string }[] {
    const newsForStop = this.newsData.find(
      (news) =>
        news &&
        news.latitude === stop.latitude &&
        news.longitude === stop.longitude,
    );
    if (newsForStop && Array.isArray(newsForStop.data) ) {
      return newsForStop.data.map((item: any) => ({ imageUrl: item.imageUrl }));
    } else {
      return [];
    }
  }
}
