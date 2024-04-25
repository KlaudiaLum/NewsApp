import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type',
  template: `{{ newsType }}`,
  styleUrls: ['./type.component.scss'],
})
export class TypeComponent {
  @Input() newsType!: string;
}
