import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  link =
  'https://www.aftonbladet.se/nyheter/a/zEdwX5/minister-timmar-tills-sverige-gar-med-i-nato';

}
