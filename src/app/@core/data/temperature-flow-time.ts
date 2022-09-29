import {Observable} from 'rxjs';

export interface Temperature {
  value: number;
  min: number;
  max: number;
}

export abstract class TemperatureHumidityData {
  abstract getTemperatureData(): Observable<Temperature>;

  abstract getFlowData(): Observable<Temperature>;

  abstract getTimeData(): Observable<Temperature>;
}
