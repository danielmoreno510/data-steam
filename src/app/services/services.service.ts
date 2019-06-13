import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppGlobals } from '../services/global'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient, private appGlobals:AppGlobals) { }
  
  serviceGet(){
    return this.http.get(this.appGlobals.urlServeUsers)
  }

  serviceGetGames(){
    return this.http.get(this.appGlobals.urlServeGames)
  }

}
