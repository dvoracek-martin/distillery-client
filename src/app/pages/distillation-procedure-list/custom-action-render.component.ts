import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationProcedure} from '../model/DistillationProcedure';
import {DistillationProcedureListComponent} from './distillation-procedure-list.component';

@Component({
    template: `
        <td>
            <button type="submit"
                    (click)="distillationProcedureListComponent.navigateToDistillationProcedureDetail(renderValue)"
                    ngcontent-bfe-c444="" nbbutton="" outline="" ng-reflect-outline="" ng-reflect-status="success"
                    aria-disabled="false" tabindex="0"
                    nbTooltip="Show detail of this distillation procedure" nbTooltipPlacement="top"
                    class="status-info appearance-outline size-medium shape-rectangle ng-star-inserted nb-transition">
                <i class="nb-search" style="font-size:40px"></i>
            </button>
        </td>
        <td>
            <button type="submit"
                    (click)="distillationProcedureListComponent.openDeleteDialog(renderValue)"
                    _ngcontent-ydc-c444="" nbbutton="" outline="" ng-reflect-outline="" ng-reflect-status="danger"
                    aria-disabled="false" tabindex="0"
                    nbTooltip="Delete this distillation procedure from the history" nbTooltipPlacement="top"
                    class="appearance-outline size-medium shape-rectangle status-danger ng-star-inserted nb-transition">
                <i class="nb-trash" style="font-size:40px"></i>
            </button>
        </td>
    `,
})

export class CustomActionRenderComponent implements ViewCell, OnInit {
    renderValue: DistillationProcedure;
    @Input() value: string | number;
    @Input() rowData: DistillationProcedure;

    constructor(public distillationProcedureListComponent: DistillationProcedureListComponent) {
    }

    ngOnInit() {
        this.renderValue = this.rowData;
    }
}
