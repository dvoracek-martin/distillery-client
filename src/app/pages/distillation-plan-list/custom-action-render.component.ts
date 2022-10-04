import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationPlan} from '../model/distillationPlan';
import {DistillationPlanListComponent} from './distillation-plan-list.component';

@Component({
  template: `
    <td>
      <button type="submit"
              (click)="distillationPlanListComponent.startDistillationPlan(renderValue)"
              ngcontent-bfe-c444="" nbbutton="" outline="" ng-reflect-outline="" ng-reflect-status="success"
              aria-disabled="false" tabindex="0"
              nbTooltip="Start the distillation plan" nbTooltipPlacement="top"
              class="status-success appearance-outline size-medium shape-rectangle ng-star-inserted nb-transition">
        <i class="nb-play-outline" style="font-size:40px"></i>
      </button>
    </td>
    <td>
      <button type="submit"
              (click)="distillationPlanListComponent.navigateToEditDistillationPlan(renderValue)"
              ngcontent-bfe-c444="" nbbutton="" outline="" ng-reflect-outline="" ng-reflect-status="success"
              aria-disabled="false" tabindex="0"
              nbTooltip="Edit the distillation plan" nbTooltipPlacement="top"
              class="status-info appearance-outline size-medium shape-rectangle ng-star-inserted nb-transition">
        <i class="nb-edit" style="font-size:40px"></i>
      </button>
    </td>
    <td>
      <button type="submit"
              (click)="distillationPlanListComponent.openDeleteDialog(renderValue)"
              _ngcontent-ydc-c444="" nbbutton="" outline="" ng-reflect-outline="" ng-reflect-status="danger"
              aria-disabled="false" tabindex="0"
              nbTooltip="Delete the distillation plan" nbTooltipPlacement="top"
              class="appearance-outline size-medium shape-rectangle status-danger ng-star-inserted nb-transition">
        <i class="nb-trash" style="font-size:40px"></i>
      </button>
    </td>
  `,
})

export class CustomActionRenderComponent implements ViewCell, OnInit {
  renderValue: DistillationPlan;
  @Input() value: string | number;
  @Input() rowData: DistillationPlan;

  constructor(public distillationPlanListComponent: DistillationPlanListComponent) {
  }

  ngOnInit() {
    this.renderValue = this.rowData;
  }
}
