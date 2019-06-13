import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExplousLoader, ExplousTable } from '@explous/explous'
import { getName } from "country-list"

import { ServicesService } from '../services/services.service'

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
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

  visibleHome=false
  countries=[]
  countriesFinal=[]
  arrayCountries=[]
  arrayCountries1=[]
  arrayCountries2=[]
  total=0
  arrayCountriesFinal=[]
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.bar()
  }

  bar(){
    setTimeout(() => {
      this.loader()
    }, 100);
    this.servicesService.serviceGet().subscribe(
      res => {
        for(var data in res){
          this.countries.push(res[data]["loccountrycode"])
        }
        // contar array por pais
        this.countries.sort();
        var current = null;
        var cnt = 0;
        for (var i = 0; i <= this.countries.length; i++) {
          if (this.countries[i] != current) {
            if (cnt > 0) {
              this.countriesFinal.push([getName(current),cnt])
            }
            current = this.countries[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        this.arrayCountriesFinal=this.countriesFinal
        for(data in this.countriesFinal){
          if(this.countriesFinal[data][1]>700){
            this.arrayCountries.push(this.countriesFinal[data])
            this.arrayCountries1.push(this.countriesFinal[data][0])
            this.arrayCountries2.push(this.countriesFinal[data][1])
            this.total=this.total+this.countriesFinal[data][1]
          }
        }
        this.barChartLabels=this.arrayCountries1
        this.barChartData=[{ data: this.arrayCountries2, backgroundColor: "#0d4cad", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#0b3e8c", label: 'Paises' }]
        this.barChartData1=[{ data: this.arrayCountries2, backgroundColor: "#0d4cad", borderColor: "#0d47a1", hoverBorderColor:"#0d47a1",hoverBackgroundColor: "#0b3e8c", label: 'Paises' }]
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
      head:["Pais", "Cantidad de jugadores"],
      colorHead:"#ffffff", 
      backgroundHead:"#1565c0", 
      body:this.arrayCountriesFinal, 
      textAlignBody:["center","center"], 
      iconOrderBy:true, 
      orderByNumber:[2], 
      pipe:["Pais"], 
      pipeType:"material", 
      headFixed:true 
    })
  }

  dateSetup(d){
    var date=new Date(d*1000)
    return date
  }

}
