import { Component, OnInit } from '@angular/core';
import { ExplousTable, ExplousLoader } from '@explous/explous'
import * as getCountryISO3  from "country-iso-2-to-3"
import * as d3 from "d3";

import { ServicesService } from '../services/services.service'

declare var Datamap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrayUsers=[]
  visibleHome=false
  countries=[]
  countriesFinal=[]
  loaderShow=false
  constructor(private servicesService: ServicesService) { }
  ngOnInit() {
    this.conectService()
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

  conectService(){
    setTimeout(() => {
      this.loader()
    }, 100);
    this.servicesService.serviceGet().subscribe(
      res => {
        for(var data in res){
          this.countries.push(res[data]["loccountrycode"])
          this.arrayUsers.push([res[data].personaname,res[data].realname,this.dateSetup(res[data].timecreated),res[data].loccountrycode])
        }

        // contar array por pais
        this.countries.sort();
        var current = null;
        var cnt = 0;
        for (var i = 0; i <= this.countries.length; i++) {
          if (this.countries[i] != current) {
            if (cnt > 0) {
              this.countriesFinal.push([getCountryISO3(current),cnt])
            }
            current = this.countries[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        //

        this.visibleHome=true
        setTimeout(() => {
          this.table()
          this.mapa()
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

  dateSetup(d){
    var date=new Date(d*1000)
    return date
  }

  table(){
    ExplousTable.init({ 
      container:"explous_table", 
      id:"table", 
      type:"pagination", 
      showResult:10, 
      head:["Usuario", "Nombre Real", "Fecha De Creacion", "Pais"],
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

  mapa(){
    var series = this.countriesFinal;
    var dataset = {};
    var onlyValues = series.map(function(obj){ return obj[1]; });
    var minValue = Math.min.apply(null, onlyValues),
    maxValue = Math.max.apply(null, onlyValues);
    var paletteScale = d3.scaleLinear().domain([minValue,maxValue]).range(["#EFEFFF","#0d47a1"]);
    series.forEach(function(item){
      var iso = item[0],
      value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    new Datamap({
      element: document.getElementById('container'),
      projection: 'mercator',
      fills: { defaultFill: '#F5F5F5' },
      data: dataset,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        highlightFillColor: function(geo) {
            return geo['fillColor'] || '#F5F5F5';
        },
        highlightBorderColor: '#B7B7B7',
        popupTemplate: function(geo, data) {
          if (!data) { return ; }
          return ['<div class="hoverinfo">',
            '<strong>', geo.properties.name, '</strong>',
            '<br>Count: <strong>', data.numberOfThings, '</strong>',
            '</div>'].join('');
        }
      }
    });
  }

}
