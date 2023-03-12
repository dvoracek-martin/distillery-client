import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationProcedure} from '../model/distillationProcedure';
import {DistillationEndReason} from '../model/distillationEndReason';

@Component({
    template: `
        <p>{{endReason}}</p>
    `,
})
export class CustomEndReasonRenderComponent implements ViewCell, OnInit {

    renderValue: DistillationProcedure;
    endReason: string;

    @Input() value: string | number;
    @Input() rowData: DistillationProcedure;

    ngOnInit() {
        this.renderValue = this.rowData;

        if (this.renderValue.distillationEndReason === DistillationEndReason[0]) {
            this.endReason = 'Distillation finished';
        } else if (this.renderValue.distillationEndReason === DistillationEndReason[1]) {
            this.endReason = 'Distillation terminated by user';
        } else if (this.renderValue.distillationEndReason === DistillationEndReason[2]) {
            this.endReason = 'Distillation not finished';
        }
    }
}
