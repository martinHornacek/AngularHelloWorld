import { Injectable } from '@angular/core';
import { WebApiConfig, Guid, create, retrieve  } from 'xrm-webapi';

@Injectable({
  providedIn: 'root'
})
export class XrmWebApiService {

  // config: WebApiConfig;
  // constructor() { 
  //   this.config = new WebApiConfig("8.2");
  // }

  // public retrieveRecord = (id: Guid, entitySetName: string, columns: string[]) => retrieve(this.config, entitySetName, id);
}