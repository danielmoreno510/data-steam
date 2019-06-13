import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExplousLoader, ExplousTable } from '@explous/explous'

import { ServicesService } from '../services/services.service'

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[]
  public barChartType: ChartType = 'bar';
  public barChartType1: ChartType = 'pie';
  public barChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#0029ac', '#aebed8', '#3671d0', '#5688d8', '#245db9', '#27539a', '#486ba5', '#6a9cef', '#6189cc', '#416cb3'],
    },
  ];

  public barChartData: ChartDataSets[];
  public barChartData1: ChartDataSets[];
  public barChartData2: ChartDataSets[];

  games=[]
  gamesFinal=[]
  arrayGamesFinal
  arrayGames=[]
  arrayGames1=[]
  arrayGames2=[]
  total=0
  visibleHome=false
  barChartLabels1
  arrayGamesLabel=[]
  arrayGamesU1=[]
  arrayGamesU2=[]
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.init()
  }

  init(){
    setTimeout(() => {
      this.loader()
    }, 100);
    this.servicesService.serviceGetGames().subscribe(
      res => {
        //console.log(res)
        for(var data in res){
          this.games.push([res[data]["name"],res[data]["playtime_2weeks"],res[data]["playtime_forever"]])
        }
        // contar array por pais
        this.games.sort();
        var current = null;
        var cnt = 0;
        var weeks=0
        var forever=0
        for (var i = 0; i <= this.games.length; i++) {
          if(this.games[i]){
            if (this.games[i][0] != current) {
              if (cnt > 0) {
                this.gamesFinal.push([current, cnt, weeks, forever])
              }
              current = this.games[i][0];
              cnt = 1;
              weeks=Number(this.games[i][1])
              forever=Number(this.games[i][2])
            } else {
              cnt++;
              weeks=Number(weeks)+Number(this.games[i][1])
              forever=Number(forever)+Number(this.games[i][1])
            }
          }
        }
        this.arrayGamesFinal=this.gamesFinal
        for(data in this.gamesFinal){
          if(this.gamesFinal[data][1]>100){
            this.arrayGames.push(this.gamesFinal[data])
            this.arrayGames1.push(this.gamesFinal[data][0])
            this.arrayGames2.push(this.gamesFinal[data][1])
            this.total=this.total+this.gamesFinal[data][1]
          }
          if(this.gamesFinal[data][2]>700*60){
            this.arrayGamesLabel.push(this.gamesFinal[data][0])
            this.arrayGamesU1.push(this.gamesFinal[data][2]/60)
            this.arrayGamesU2.push(this.gamesFinal[data][3]/60)
          }
        }
        this.barChartLabels=this.arrayGames1
        this.barChartLabels1=this.arrayGamesLabel
        this.barChartData=[{ data: this.arrayGames2, backgroundColor: "#0d4cad", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#0b3e8c", label: 'Juegos' }]
        this.barChartData1=[{ data: this.arrayGames2, backgroundColor: "#0d4cad", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#0b3e8c", label: 'Juegos' }]
        this.barChartData2=[
          { data: this.arrayGamesU1, backgroundColor: "#0d4cad", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#3671d0", label: 'Horas Juegos 2 Semanas' },
          { data: this.arrayGamesU2, backgroundColor: "#aebed8", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#3671d0", label: 'Horas Juegos Siempre' }
        ]
        this.visibleHome=true
        setTimeout(() => {
          this.table()
        }, 500);
      },
      err => {
        console.log(err);
      }
    );
  }

  loader(){
    ExplousLoader.init({ 
      container:"explous_loader", 
      type:"ring", 
      color:"#1565c0", 
      size:"300px", 
      border:"14px", 
    }) 
  }

  table(){
    ExplousTable.init({ 
      container:"explous_table", 
      id:"table", 
      type:"pagination", 
      showResult:10, 
      head:["Juego", "Cantidad De Jugadores", "Minutos En Las Ultimas 2 Semanas", "Minutos Por Siempre"],
      colorHead:"#ffffff", 
      backgroundHead:"#1565c0", 
      body:this.arrayGamesFinal, 
      textAlignBody:["center","center"], 
      iconOrderBy:true, 
      orderByNumber:[2], 
      pipe:["Juego"], 
      pipeType:"material", 
      headFixed:true 
    })
  }

}
