/**
 * Created by WGP on 2017/4/24.
 */
import { Component,OnInit,Directive,ElementRef,HostListener,Input } from '@angular/core';
import {DataService} from "./dataservice";
import {  } from './util-function';


@Component({
  selector:'data-grid',
   templateUrl:'datagrid.component.html',
  styleUrls:['./datagrid.component.css']
})



export class DataGridComponent implements OnInit{
 
data:string[][]=new Array();  //假分页查询是用来保存全部的数据

viewData:string[][]= new Array();    //界面显示的数据
@Input()sizeList:Array<number>; //页大小的选择
@Input() title:Array<string>;    //数据标题
@Input() url :string;            //远程服务地址
@Input() pageSize:number =10;     //页大小，初始为10
@Input() page:number=1;     //页号，初始为1
@Input() paging:string;           //判断是否为真分页
arr:string[] = new Array();                   //保存json数据串中的字段名（不包括GUID字段）
total:number;
type:string[][]= new Array();               //控制数据的隐藏
totalPages:number = this.total/this.pageSize*10;     //总页数
      

//依赖注入，提供http服务
constructor(private dataService:DataService){
  
  }
 ngOnInit(){

     let url = this.url;
     if(this.paging){
       url = url+"?pageIndex="+this.page+"&pageIndex="+this.pageSize;
       
     }
     this.getData(url);
    
}
//假分页显示数据方法,直接跳转到某页
showData():void{
  if(typeof this.pageSize == "string"){  //这里不知道为什么，自动转为string类型了，必须强制转换为number
      this.pageSize =Number(this.pageSize);
  }
  if(this.paging){
    let url = this.url +"?page="+this.page+"&pageSize="+this.pageSize;
     this.getData(url);
     this.viewData = this.data;

  }else{
    let begin = (this.page-1)* this.pageSize;
    let end = begin + this.pageSize;
    this.viewData = this.data.slice(begin,end);
  }
}


  //初始化数据 -- 武刚鹏-2017年4月26日
  getData(url:string):void{
    
  this.dataService
      .getData(url).then(
        res=>{
          this.total =res.data.length;
          this.data = res.data;
          for(var item in res.data[0] ){
            if(item != "id"){
              this.arr.push(item);
            }
            
          }
           for(var i in res.data ){
            let array:string[] = new Array();
            for(var j in res.data[i]){
               array.push("true");
            }
            this.type.push(array);
            
          }
          if(this.paging){
              this.viewData = res.data;
          } else{
            this.viewData = res.data.slice(0,10);
          }
        });
         
  }
 
  




//构造函数，初始化服务
  

  //移除当前选中行
  removeCurrent(index:number):void{
    this.viewData.splice(index,1);
  }

  
   //改变页号
   changePage(page:number):void{
    this.page=page;
    this.totalPages = this.total/this.pageSize*10;
     this.showData();
   }
//改变页大小
changePageSize():void{
  this.page =1;
    this.totalPages = this.total/this.pageSize*10;
    this.showData();
}

//双击可编辑表格
edit(i:number,j:number){
  this.type[i][j]="false";

}

//更新表格数据
update(value: string,i:number,j:number) { 
    this.data[i][this.arr[j]] = value;
    this.type[i][j]="true";
    this.showData();
  

 }

 //滚动条滚动事件-用来使得标题行可以随水平滚动条滚动
 getScollerWidth(){
 
		 var a = document.getElementById("content").scrollLeft;
		 document.getElementById("top_topic").scrollLeft = a;
	
	}






}
  







