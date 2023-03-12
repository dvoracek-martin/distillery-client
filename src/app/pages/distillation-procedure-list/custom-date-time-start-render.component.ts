import {Component, Input, OnInit} from '@angular/core';

import {ViewCell} from 'ng2-smart-table';
import {DistillationProcedure} from '../model/distillationProcedure';

@Component({
    template: `
        <p>{{formattedDate}}</p>
    `,
})
export class CustomDateTimeStartRenderComponent implements ViewCell, OnInit {

    renderValue: DistillationProcedure;
    date: Date;
    formattedDate: string;

    @Input() value: string | number;
    @Input() rowData: DistillationProcedure;

    ngOnInit() {
        this.renderValue = this.rowData;
        this.date = new Date(this.renderValue.distillationTimeStart);
        this.formattedDate = this.date.getDate() + '.' + this.date.getMonth() + '.' + this.date.getFullYear() + ' ' + this.date.getHours() + ':' + this.date.getMinutes();
    }
}
