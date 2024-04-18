import { TestBed } from '@angular/core/testing';

import { LibpisService } from './libpis.service';
import { InitParams, Mixer, NormalizedState, PIS, PublishMqttData, ScreenshotPublish } from '@msetsuite/libpis';
import { Observable, BehaviorSubject } from 'rxjs';

describe('LibpisService', () => {
  let service: LibpisService;

  const pis: PIS = {
    
    updates: function (): Observable<NormalizedState> {
      throw new Error('Function not implemented.');
    },
    getMixer: function (): Mixer {
      throw new Error('Function not implemented.');
    },
    publishScreenshot: function (payload: ScreenshotPublish): void {
      throw new Error('Function not implemented.');
    },
    publishMqttData: function <T>(data: PublishMqttData<T>): void {
      throw new Error('Function not implemented.');
    },
    isConnected: function (): BehaviorSubject<boolean> {
      throw new Error('Function not implemented.');
    }
  }

  let navigationMock =  {
      pis: {        
        init: (params: InitParams) => {},
        client: {
          updates: jasmine.createSpy().and.returnValue(undefined),
        },
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibpisService],
    });
    service = TestBed.inject(LibpisService);
  });

  it('should be created', () => {
    window.luminator = {
      pis: {
        client: {
          updates: function (): Observable<NormalizedState> {
            throw new Error('Function not implemented.');
          },
          getMixer: function (): Mixer {
            throw new Error('Function not implemented.');
          },
          publishScreenshot: function (payload: ScreenshotPublish): void {
            throw new Error('Function not implemented.');
          },
          publishMqttData: function <T>(data: PublishMqttData<T>): void {
            throw new Error('Function not implemented.');
          },
          isConnected: function (): BehaviorSubject<boolean> {
            throw new Error('Function not implemented.');
          },
          mqtt: undefined,
          mixer: undefined
        }
      }
    };

    window.luminator.pis = pis;
    expect(service).toBeTruthy();
  });
});
