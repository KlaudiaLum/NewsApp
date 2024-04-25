import { InitParams, NormalizedState, PIS } from '@msetsuite/libpis';

export {};

declare global {
  interface Window {
    luminator: {
      pis: {
        client: PIS;
        init(params: InitParams): void;
      };
    };
  }
}
