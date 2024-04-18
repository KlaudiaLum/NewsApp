import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { StopListComponent } from './stop-list/stop-list.component';
import { TitleComponent } from './titile/titile.component';
import { LibpisService } from 'src/service/libpis.service';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, QRCodeModule, HttpClientModule],
    declarations: [AppComponent, QrCodeComponent, StopListComponent, TitleComponent],
    providers:[LibpisService]

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
