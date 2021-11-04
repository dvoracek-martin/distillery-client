import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationPlan} from '../model/distillationPlan';
import {Observable} from 'rxjs/Observable';

@NgModule()
export class DistillationPhaseService {

  private readonly phasesUrl: string;

  constructor(private http: HttpClient) {
    this.phasesUrl = 'http://localhost:8080/api/phase';
  }

  public findAll(): Observable<DistillationPlan[]> {
    return this.http.get<DistillationPlan[]>(this.phasesUrl + '/getAll');
  }

  public get(distillationPlanId: number): Observable<DistillationPlan> {
    return this.http.get<DistillationPlan>(this.phasesUrl + '/' + distillationPlanId);
  }

  public start(distillationPlan: DistillationPlan): Observable<DistillationPlan[]> {
    return this.http.post<DistillationPlan[]>(this.phasesUrl + '/start', distillationPlan);
  }

  public save(distillationPlan: DistillationPlan) {
    return this.http.post<DistillationPlan>(this.phasesUrl, distillationPlan);
  }

  public update(distillationPlan: DistillationPlan) {
    return this.http.put<DistillationPlan>(this.phasesUrl + '/' + distillationPlan.id, distillationPlan);
  }

  public delete(distillationPlan: DistillationPlan) {
    return this.http.delete<DistillationPlan>(this.phasesUrl + '/' + distillationPlan.id);
  }

  public jumpToNextPhase(distillationPlan: DistillationPlan) {
    return this.http.post<DistillationPlan>(this.phasesUrl + '/next', distillationPlan);
  }
}
