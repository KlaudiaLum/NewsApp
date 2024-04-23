import { Injectable } from '@angular/core';
import { NormalizedState } from '@msetsuite/libpis';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LibpisService {

  state$: Observable<NormalizedState>;

  constructor(){
    if (!window.luminator.pis) {
      throw Error('Can\'t find LibPIS')
    }

    window.luminator.pis.init(environment.mqttConfig);
    this.state$ = window.luminator.pis.client.updates();
  }

  getState(): Observable<NormalizedState> {
    return this.state$;
  }
}
