import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  template: `{{ newsDescription }}`,
  styleUrls: ['./subtitle.component.scss'],
})
export class SubtitleComponent {
  @Input() newsDescription!: string;
}
