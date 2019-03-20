import { Component } from '@angular/core';
import { CrmService, Entity } from './crm.service';
import { LoadQuoteFromCrmAction, SaveQuoteToCrmAction } from './crm/store/actions/quote.actions';
import { Store, select } from '@ngrx/store';
// import { getQuoteState } from './crm/store/selectors/quote.selectors';
import { takeWhile } from 'rxjs/operators';
import { CrmState } from './crm/store/states/quote.states';
import { Guid } from 'xrm-webapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'AngularHelloWorld';
    errorMessage: string = null;
    accounts: Entity[] = [];
    // quote: QuoteState = null;

    constructor(private crmService: CrmService,
      private store : Store<CrmState>) { }

    ngOnInit() {
        // this.crmService
        //   .search("accounts", "name", null)
        //   .subscribe(entities => this.accounts = entities, error => this.errorMessage = <any>error);
        // this.store.pipe(
        //   select(getQuoteState)
        //   //takeWhile(() => 'xxx')
        // ).subscribe(
        //   quote => this.quote = quote
        // );
        this.store.dispatch(new LoadQuoteFromCrmAction({ quoteId: "16716EE2-2134-E911-80F5-005056A6D254" }));
        this.store.dispatch(new SaveQuoteToCrmAction({ quote: { quoteid: new Guid('16716EE2-2134-E911-80F5-005056A6D254'), description: '', name: ''} }));
    }
}
