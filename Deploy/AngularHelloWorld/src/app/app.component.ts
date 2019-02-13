import { Component } from '@angular/core';
import { CrmService, Entity } from './crm.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'AngularHelloWorld';
    errorMessage: string = null;
    accounts: Entity[] = [];

    constructor(private crmService: CrmService) { }

    ngOnInit() {
        this.crmService
          .search("accounts", "name", null)
          .subscribe(entities => this.accounts = entities, error => this.errorMessage = <any>error);
    }
}
