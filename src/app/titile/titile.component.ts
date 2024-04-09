import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titile',
  templateUrl: './titile.component.html',
  styleUrls: ['./titile.component.scss']
})
export class TitileComponent {
@Input()   newsTitle!: string;
}
