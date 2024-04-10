import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StopListService {
  private stops: string[] = [];

  setStops(stops: string[]) : void {
    this.stops = stops
  }

  getStops():string[]{
    return this.stops
  }
}
