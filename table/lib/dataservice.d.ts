import { Injectable,Input}    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export declare class DataService  {
  
  private Configuration:any;
   constructor(http: Http);
  
   
public getConfiguration():any;
private handleError(error: any): Promise<any>;
private getWebfig():void;
public getData(url:string):Promise<any>;
}
