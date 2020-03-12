import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any[]>('http://localhost:5000/grafica')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any[]) => {
        this.lineChartData = [...data];
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
