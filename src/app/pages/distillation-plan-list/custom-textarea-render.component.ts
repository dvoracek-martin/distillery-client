import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationPlan} from '../model/distillationPlan';

@Component({
  template: `
    <textarea readonly rows="5" nbInput fullWidth shape="round" placeholder="Plan description"
              class="form-control input-full-width size-medium status-basic shape-rectangle nb-transition"
              formControlName="secondCtrl"
    >{{renderValue.description}}</textarea>
  `,
})
export class CustomTextareaRenderComponent implements ViewCell, OnInit {

  renderValue: DistillationPlan;

  @Input() value: string | number;
  @Input() rowData: DistillationPlan;

  ngOnInit() {
    this.renderValue = this.rowData;
  }
}
