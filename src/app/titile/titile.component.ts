import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `<p>{{ newsTitle }}</p>`,
  styleUrls: ['./titile.component.scss'],
})
export class TitleComponent {
  @Input() newsTitle!: string;
}