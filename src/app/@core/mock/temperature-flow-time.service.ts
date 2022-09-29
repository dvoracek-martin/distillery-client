import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {Temperature, TemperatureHumidityData} from '../data/temperature-flow-time';

@Injectable()
export class TemperatureFlowTimeService extends TemperatureHumidityData {

  private temperatureDate: Temperature = {
    value: 50,
    min: 1,
    max: 120,
  };

  private humidityDate: Temperature = {
    value: 50,
    min: 1,
    max: 100,
  };

  private flowDate: Temperature = {
    value: 50,
    min: 1,
    max: 5000,
  };

  private timeDate: Temperature = {
    value: 50,
    min: 1,
    max: 120,
  };

  getTemperatureData(): Observable<Temperature> {
    return observableOf(this.temperatureDate);
  }

  getHumidityData(): Observable<Temperature> {
    return observableOf(this.humidityDate);
  }

  getFlowData(): Observable<Temperature> {
    return observableOf(this.flowDate);
  }

  getTimeData(): Observable<Temperature> {
    return observableOf(this.timeDate);
  }
}
