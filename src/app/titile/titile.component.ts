import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './titile.component.html',
  styleUrls: ['./titile.component.scss']
})
export class TitleComponent {
    @Input()   newsTitle!: string;
}
