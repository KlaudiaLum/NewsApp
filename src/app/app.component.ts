import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-stop-list></app-stop-list>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  

  /**
   * Connec LibPIS with MQTT broker
   *
  initConnection() {
    if (!window.luminator.pis) {
      console.error('luminator or pis is not defined');
    }

    window.luminator.pis.init(this.mqttConfig);

    window.luminator.pis.client.updates().subscribe({
      next: (state: any) => {
        if (state) {
          console.log('LibPis ', state);
          this.receiveStopList(state);
          this.receiveCoordinates(state);
        } else {
          console.log('Waiting for data...');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetchching data:', error);
      },
    });
  }
  */
  
  /**
   * get stop list
   *
  receiveStopList(state: any): void {
    const stopNames = [state.stopList];
    this.stops = stopNames;
    console.log('Stop names: ', this.stops);
    this.stopListService.setStops(stopNames);
    const retrievedStops = this.stopListService.getStops();
    console.log('Retrieved stops:', retrievedStops);
  }
  */
}
