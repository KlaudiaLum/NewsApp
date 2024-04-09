import { InitParams } from '@msetsuite/libpis';
import { Observable } from 'rxjs';

export {};

declare global {
  interface Window {
    luminator: {
      pis: {
        client: {
          updates(): Observable<unknown>;
        };
        init(params: InitParams): void;
      };
    };
  }
}
