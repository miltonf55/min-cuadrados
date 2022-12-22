import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  xactual:number=0
  yactual:number=0
  x:number[]=[]
  y:number[]=[]
  xsum:number=0
  ysum:number=0
  xy:number[]=[]
  xysum:number=0
  x2:number[]=[]
  x2sum:number=0
  m:number=0
  b:number=0
  n:number=0
  yest:number[]=[]

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.lineChartData.datasets[0].data=this.mapAr(this.x, this.y);
      this.lineChartData.datasets[1].data=this.mapAr(this.x, this.yest);
      this.chart?.update();
    }
  }

  addP(){
    this.x.push(this.xactual);
    this.y.push(this.yactual);
    this.xy.push(this.xactual*this.yactual);
    this.x2.push(Math.pow(this.xactual, 2));
    this.xsum=this.suma(this.x);
    this.ysum=this.suma(this.y);
    this.xysum=this.suma(this.xy);
    this.x2sum=this.suma(this.x2);
    this.n=this.x.length;
    this.m=((this.n*this.xysum)-(this.xsum*this.ysum))/((this.n*this.x2sum)-(Math.pow(Math.abs(this.xsum), 2)));
    this.b=((this.ysum*this.x2sum)-(this.xsum*this.xysum))/((this.n*this.x2sum)-(Math.pow(Math.abs(this.xsum), 2)));
    this.yest=[]
    this.x.forEach(xs => {
      this.yest.push(this.m*xs+this.b)
    });
    this.lineChartData.datasets[0].data=this.mapAr(this.x, this.y);
    this.lineChartData.datasets[1].data=this.mapAr(this.x, this.yest);
    this.chart?.update();
  }
  popP(i:number){
    this.x.splice(i,1);
    this.y.splice(i,1);
    this.xy.splice(i,1);
    this.x2.splice(i,1);
    this.xsum=this.suma(this.x);
    this.ysum=this.suma(this.y);
    this.xysum=this.suma(this.xy);
    this.x2sum=this.suma(this.x2);
    this.n=this.x.length;
    this.m=((this.n*this.xysum)-(this.xsum*this.ysum))/((this.n*this.x2sum)-(Math.pow(Math.abs(this.xsum), 2)));
    this.b=((this.ysum*this.x2sum)-(this.xsum*this.xysum))/((this.n*this.x2sum)-(Math.pow(Math.abs(this.xsum), 2)));
    this.yest=[]
    this.x.forEach(xs => {
      this.yest.push(this.m*xs+this.b)
    });
    this.lineChartData.datasets[0].data=this.mapAr(this.x, this.y);
    this.lineChartData.datasets[1].data=this.mapAr(this.x, this.yest);
    this.chart?.update();
  }

  reiniciar(){
    this.x=[]
    this.y=[]
    this.xy=[]
    this.x2=[]
    this.xsum=0;
    this.ysum=0;
    this.xysum=0;
    this.x2sum=0;
    this.m=0
    this.n=0
    this.b=0
    this.yest=[]
    this.lineChartData.datasets[0].data=this.mapAr(this.x, this.y);
    this.lineChartData.datasets[1].data=this.mapAr(this.x, this.yest);
    this.chart?.update();
  }

  suma(e:number[]):number{
    let result = e.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
    return result
  }

  mapAr(xm:number[], ym:number[]):any{
    let mapead:any=xm.map((xs, i)=> {
      return {
        x: xs,
        y: ym[i],
        r: 5
      }
    });
    return mapead;
  }

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.mapAr(this.x, this.y),
        label: 'y',
        backgroundColor: [
          'magenta',
        ],
        borderColor: 'magenta',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
      {
        data: this.mapAr(this.x, this.yest),
        label: 'y estimada',
        backgroundColor: [
          'red',
        ],
        borderColor: 'red',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
    ]
  };
}
