import { Component } from '@angular/core';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Số bệnh nhân'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Doanh thu'}
  ];

  public barChartData2: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Số lượng'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Số lần dùng'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
