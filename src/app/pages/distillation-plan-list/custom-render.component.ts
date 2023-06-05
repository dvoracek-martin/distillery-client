import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationPlan} from '../model/distillationPlan';

@Component({
    template: `
    <table>
      <thead>
      <tr>
        <th><span>Name</span></th>
        <th><span>Max Temperature</span></th>
        <th><span>Max Flow</span></th>
        <th><span>Time</span></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let phase of distillationPlan.distillationPhases">
        <td>{{phase.name}}</td>
        <td>{{phase.temperature | number:'1.0-0'}} °C</td>
        <td>{{phase.flow | number:'1.0-0'}} ml / h</td>
        <td>{{phase.time / 60000 | number:'1.0-0'}} m</td>
      </tr>
      </tbody>
    </table>
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

    distillationPlan: DistillationPlan;

    @Input() value: string | number;
    @Input() rowData: DistillationPlan;

    ngOnInit() {
        this.distillationPlan = this.rowData;
    }

}
