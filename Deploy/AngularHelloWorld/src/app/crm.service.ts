import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";


interface XrmContext {
    getClientUrl(): string;
}

interface SearchResult {
    value: Entity[]
}

export interface Entity {
}

@Injectable({
    providedIn: 'root'
})
export class CrmService {
  constructor(private http: Http) { }

//   private apiUrl = "/api/data/v8.2/";

//     getClientUrl() {
//         if (window.parent != null && window.parent["Xrm"] != null) {
//             var x = window.parent["Xrm"]["Page"]["context"] as XrmContext;
//             if (x != null) {
//                 return x.getClientUrl();
//             }
//         }
//         // fallback for development environment
//         return "http://localhost:4200";
//     }

//     search(entityType: string, columns: string, filter: string): Observable<Entity[]> {
//         let headers = new Headers({ "Accept": "application/json" });
//         headers.append("OData-MaxVersion", "4.0");
//         headers.append("OData-Version", "4.0");

//         let options = new RequestOptions({ headers: headers });

//       return this.http.get(this.getClientUrl() + this.apiUrl + entityType + "?$select=" + columns, options)
//           .pipe(map(this.extractSearchResult));
//           //catchError(this.handleError);
//     }

//     private extractSearchResult(res: Response) {
//         let body = res.json() as SearchResult;
//         return body.value;
//     }

//     private handleError(error: Response | any) {
//         let errMsg: string;
//         if (error instanceof Response) {
//             const body = error.json() || "";
//             const err = body.error || JSON.stringify(body);
//             errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//         } else {
//             errMsg = error.message ? error.message : error.toString();
//         }
//         console.error(errMsg);
//         return Observable.throw(errMsg);
//     }
}
