import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss']
})
export class StopListComponent {
@Input() stops: any[] = []
}
