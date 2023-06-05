import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';
import {DistillationProcedureService} from '../../service/distillation-procedure.service';


@Component({
    selector: 'ngx-chart-panel-header',
    styleUrls: [],
    templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnInit, OnDestroy {

    @Output() periodChange = new EventEmitter<string>();
    @Input() type: string = 'temperature';
    phases: string[] = [];
    chartLegend: { iconColor: string; title: string }[];
    breakpoint: NbMediaBreakpoint = {name: '', width: 0};
    breakpoints: any;
    currentTheme: string;
    private alive = true;

    constructor(private themeService: NbThemeService,
                private breakpointService: NbMediaBreakpointsService,
                private distillationProcedureService: DistillationProcedureService) {
        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                const orderProfitLegend = theme.variables.orderProfitLegend;
                this.currentTheme = theme.name;
                this.setLegendItems(orderProfitLegend);
                this.setPhases();
            });

        this.breakpoints = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe(([oldValue, newValue]) => {
                this.breakpoint = newValue;
            });
    }

    setLegendItems(orderProfitLegend) {
        this.chartLegend = [
            {
                iconColor: orderProfitLegend.secondItem,
                title: 'Flow is counted in ml per minute',
            },
        ];
    }

    ngOnDestroy() {
        this.alive = false;
    }

    ngOnInit(): void {
        this.setPhases();
    }

    public setPhases(): void {
        console.log('sdfaf');
        this.distillationProcedureService.getPhaseIds().subscribe(value1 => {
            this.phases = value1;
            console.log(JSON.stringify(this.phases));
        });
    }

    changePeriod(period: string): void {
        this.setPhases();
        this.type = period;
        this.periodChange.emit(period);
    }
}
