import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ExchangeData} from '../model/exchangeData';


@NgModule()
export class ExchangeDataService {

  private readonly exchangeDataUrl: string;

  constructor(private http: HttpClient) {
    this.exchangeDataUrl = 'http://localhost:8080/api/data';
  }


  public getLast(): Observable<ExchangeData> {
    return this.http.get<ExchangeData>(this.exchangeDataUrl + '/last');
  }

  public updateExchangeData(exchangeData: ExchangeData) {
    exchangeData.timestamp = Date.now();
    return this.http.post<ExchangeData>(this.exchangeDataUrl, exchangeData);
  }
}
