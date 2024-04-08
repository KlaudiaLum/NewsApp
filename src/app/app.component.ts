import { Component } from '@angular/core';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  template: `
  <p> NewsApp </p>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NewsApp';
  mqttConfig = environment.mqtt;

ngOnInit(): void {
  this.initConnection();
}


   // connectet libpis with mqtt broker
   initConnection() {
    window.luminator.pis.init(this.mqttConfig);
    console.log("MQTT broker config ", this.mqttConfig);
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
