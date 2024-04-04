import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { HttpClientModule } from '@angular/common/http';

import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';


import { HttpClientModule } from '@angular/common/http';
import { TitileComponent } from './titile/titile.component';

@NgModule({
  declarations: [
    AppComponent,
    SubtitleComponent,
    QrCodeComponent,
    TitileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
