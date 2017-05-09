/**
 * Created by WGP on 2017/4/25.
 */
import { Injectable,Input}    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export  class DataService {

 private   Configuration:any;
  // private headers = new Headers({'Content-Type': 'application/json'});
public getConfiguration(){
  return this.Configuration;
}
   constructor(private http:Http){
      this.getWebfig();
   }

   //调用远程地址，获取数据 get方法
   //返回response的json串
  public getData(url:string): Promise<any> {
      return this.http 
               .get(url)
               .toPromise()
               .then(response => response.json() as any )
               .catch(this.handleError);

  }
private  getWebfig(){
 
 this.http.get("src/mock-data/web-config.json")
            .map((res: Response) => res.json()).subscribe(data=>this.Configuration=data);
    
}

  
  //错误处理
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

