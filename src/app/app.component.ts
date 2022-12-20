import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  }
  popP(){
    this.x.pop()
    this.y.pop()
    this.xy.pop()
    this.x2.pop()
    this.xsum=this.suma(this.x);
    this.ysum=this.suma(this.y);
    this.xysum=this.suma(this.xy);
    this.x2sum=this.suma(this.x2);
    this.n=this.x.length;
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
  }

  suma(e:number[]):number{
    let result = e.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
    return result
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'y',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
  };
}
