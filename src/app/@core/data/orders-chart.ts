export interface OrdersChart {
    chartLabel: string[];
    linesData: number[][];
}

export abstract class OrdersChartData {
    abstract getChartData(period: string): OrdersChart;
}
