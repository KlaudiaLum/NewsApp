import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {
  @Input() link = 'https://www.aftonbladet.se/nyheter/a/zEdwX5/minister-timmar-tills-sverige-gar-med-i-nato';
}
