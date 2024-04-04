import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeComponent } from './qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';

describe('QrCodeComponent', () => {
  let component: QrCodeComponent;
  let fixture: ComponentFixture<QrCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeComponent],
      imports:[QRCodeModule]
    });
    fixture = TestBed.createComponent(QrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
