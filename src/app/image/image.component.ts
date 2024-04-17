import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  template: `<img [src]="newsImage" alt="News Image" />`,
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() newsImage!: string;
}
