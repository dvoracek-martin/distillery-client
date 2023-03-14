import {NgModule} from '@angular/core';
import {OrdersChart, OrdersChartData} from '../../@core/data/orders-chart';
import {PeriodsService} from './periods.service';
import {ElasticsearchService} from './elasticsearch-service';
import {DistillationProcessDataFromRaspiDto} from '../model/distillationProcessDataFromRaspiDto';
import {OrderProfitChartSummary} from '../../@core/data/orders-profit-chart';

@NgModule()
export class ChartService extends OrdersChartData {

    private timestamps = [];
    private maxTemperature: number = 0;
    private minTemperature: number = 0;
    private maxFlow: number = 0;
    private minFlow: number = 0;
    private maxAlc: number = 0;

    private data = {};
    private valuesFromRaspi: number[][];

    constructor(private elasticsearchService: ElasticsearchService,
                private period: PeriodsService) {
        super();
    }

    private getDataForTeperature(): OrdersChart {
        this.elasticsearchService.get(1).subscribe(result => {
            let i = 0;
            const temperatures = new Array<number>();
            const flows = new Array<number>();
            const weights = new Array<number>();
            result.forEach(function (value) {
                temperatures[i] = value.temperature;
                flows[i] = value.flow;
                weights[i] = value.weight;
                i++;
            });
            this.valuesFromRaspi = [temperatures, flows, weights];
        });
        const temperature: number[] = this.valuesFromRaspi[0];
        return {
            chartLabel: this.getDataLabels(temperature.length, this.timestamps),
            linesData: [temperature],
        };
    }

    private getDataForFlow(): OrdersChart {
        const flow: number[] = this.valuesFromRaspi[1];
        return {
            chartLabel: this.getDataLabels(flow.length, this.timestamps),
            linesData: [, flow],
        };
    }

    private getDataForWeight(): OrdersChart {
        const weight: number[] = this.valuesFromRaspi[2];
        return {
            chartLabel: this.getDataLabels(weight.length, this.timestamps),
            linesData: [, , weight],
        };
    }

    private getDataForAlc() {
        const alcs: number[] = this.valuesFromRaspi[3];
        return {
            chartLabel: this.getDataLabels(alcs.length, this.timestamps),
            linesData: [, , , alcs],
        };
    }

    getDataLabels(nPoints: number, labelsArray: string[]): string[] {
        const labelsArrayLength = labelsArray.length;
        const step = Math.round(nPoints / labelsArrayLength);

        return Array.from(Array(nPoints)).map((item, index) => {
            const dataIndex = Math.round(index / step);

            return index % step === 0 ? labelsArray[dataIndex] : '';
        });
    }

    getChartData(type: string): OrdersChart {
        return this.data[type];
    }

    refreshChartData(distillationProcedureId: number) {
        this.elasticsearchService.get(distillationProcedureId).subscribe(result => {
            this.setData(result);
        });
    }

    private setData(result: DistillationProcessDataFromRaspiDto[]) {
        let i = 0;
        const temperatures = new Array<number>();
        const flows = new Array<number>();
        const weights = new Array<number>();
        const timeline = new Array<string>();
        const alcs = new Array<number>();

        result.forEach(function (value) {
            temperatures[i] = value.temperature;
            flows[i] =  Math.trunc(value.flow / 60);
            weights[i] = value.weight;
            // TODO
            alcs [i] = 1;

            let seconds = Math.floor(value.timeStartedInMillis / 1000);
            const minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            timeline[i] = minutes.toString().padStart(2, '0') + 'm:' + seconds.toString().padStart(2, '0') + 's';

            i++;
        });
        this.valuesFromRaspi = [temperatures, flows, weights, alcs];
        this.data = {
            temperature: this.getDataForTeperature(),
            flow: this.getDataForFlow(),
            weight: this.getDataForWeight(),
            alc: this.getDataForAlc(),
        };
        this.timestamps = timeline;
        this.maxTemperature = Math.max(...this.valuesFromRaspi[0]);
        this.minTemperature = Math.min(...this.valuesFromRaspi[0]);
        this.maxFlow = Math.max(...this.valuesFromRaspi[1]);
        this.minFlow = Math.min(...this.valuesFromRaspi[1]);
        this.maxAlc = Math.max(...this.valuesFromRaspi[3]);
    }

    public getSummary(): OrderProfitChartSummary[] {
        const summary = [
            {
                title: 'Max temperature',
                value: this.maxTemperature.toString() + '°C',
            },
            {
                title: 'Min temperature',
                value: this.minTemperature.toString() + '°C',
            },
            {
                title: 'Max flow',
                value: this.maxFlow + ' ml/min',
            },
            {
                title: 'Min flow',
                value: this.minFlow + ' ml/min',
            },
            {
                title: 'Max Alc %',
                value: this.maxAlc + '%',
            },
        ];
        return summary;
    }
}
