import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {DataGridComponent} from "./datagrid.component";
import { RouterModule,Routes} from '@angular/router';
import { HttpModule} from '@angular/http';
import {DataService} from "./dataservice";
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DataGridComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   NgbModule.forRoot(),
    // InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers:[DataService],
  exports:[DataGridComponent]

})
export class DataGridModule {
  
 }
