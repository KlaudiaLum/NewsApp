import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-stop-list></app-stop-list>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
