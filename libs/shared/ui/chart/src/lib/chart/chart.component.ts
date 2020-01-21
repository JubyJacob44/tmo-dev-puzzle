import {  
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { CHART_CONSTANTS, Chart } from '@coding-challenge/common/util';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;

  chart: Chart;
  constructor() {}

  ngOnInit() {
    this.chart = CHART_CONSTANTS.CHART;
    this.data$.subscribe(newData => (this.chartData = newData));
  }
}
