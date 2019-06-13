import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExplousLoader, ExplousTable } from '@explous/explous'

import { ServicesService } from '../services/services.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
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
  public barChartLabels: Label[] = ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[];

  visibleHome=false
  users=[]
  usersFinal=[]
  total
  arrayUsers=[]
  loaderShow=false
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.bar()
    this.detectTable()
  }

  detectTable(){
    if(document.getElementById("table")){
      this.loaderShow=true
    }else{
      setTimeout(() => {
        this.detectTable()
      }, 50);
    }
  }

  bar(){
    setTimeout(() => {
      this.loader()
    }, 100);
    this.servicesService.serviceGet().subscribe(
      res => {
        for(var data in res){
          this.arrayUsers.push([res[data].steamid,res[data].personaname,this.dateSetup(res[data].lastlogoff),res[data].realname,this.dateSetup(res[data].timecreated),res[data].loccountrycode])
          var newDate=(new Date(res[data]["lastlogoff"]*1000)).getFullYear()
          this.users.push(newDate)
        }
        // contar array por pais
        this.users.sort();
        var current = null;
        var cnt = 0;
        for (var i = 0; i <= this.users.length; i++) {
          if (this.users[i] != current) {
            if (cnt > 0) {
              this.usersFinal.push([cnt])
            }
            current = this.users[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        this.total=this.usersFinal[0][0]+this.usersFinal[1][0]+this.usersFinal[2][0]+this.usersFinal[3][0]+this.usersFinal[4][0]+this.usersFinal[5][0]+this.usersFinal[6][0]+this.usersFinal[7][0]+this.usersFinal[8][0]+this.usersFinal[9][0]+this.usersFinal[10][0]+this.usersFinal[11][0]
        this.usersFinal=[
          this.usersFinal[0][0],
          this.usersFinal[1][0],
          this.usersFinal[2][0],
          this.usersFinal[3][0],
          this.usersFinal[4][0],
          this.usersFinal[5][0],
          this.usersFinal[6][0],
          this.usersFinal[7][0],
          this.usersFinal[8][0],
          this.usersFinal[9][0],
          this.usersFinal[10][0],
          this.usersFinal[11][0]
        ]
        this.barChartData=[{ data: this.usersFinal, pointHoverBorderWidth:7, pointRadius:7, backgroundColor: "transparent", borderColor: "#0d47a1", pointBorderWidth:1, pointBackgroundColor:"#0d47a1", pointBorderColor:"#aebed8", pointHoverBorderColor:"#0d47a1", pointHoverBackgroundColor: "#0b3e8c", label: 'Ultimo Ingreso' }]
        this.visibleHome=true
        //
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
      head:["Id Steam","Usuario","Ultimo Ingreso", "Nombre Real", "Fecha De Creacion", "Pais"],
      colorHead:"#ffffff", 
      backgroundHead:"#1565c0", 
      body:this.arrayUsers, 
      textAlignBody:["center","center","center","center", "center", "center"], 
      iconOrderBy:true, 
      orderByNumber:[3,4], 
      pipe:["Usuario","Pais"], 
      pipeType:"material", 
      headFixed:true 
    })
  }

  dateSetup(d){
    var date=new Date(d*1000)
    return date
  }

}
