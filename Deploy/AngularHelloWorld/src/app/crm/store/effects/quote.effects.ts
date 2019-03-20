import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { XrmWebApiService } from '../../services/xrmwebapi.service';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { QuoteActionTypes, LoadQuoteFromCrmSuccessAction, LoadQuoteFromCrmFailureAction, SaveQuoteToCrmSuccessAction, SaveQuoteToCrmFailureAction } from '../actions/quote.actions';
import { Guid } from 'xrm-webapi';
import { Quote } from '../states/quote.states';


@Injectable()
export class QuoteEffects {
  private quote: Quote;
  constructor(
    private actions$: Actions,
    private crmService: XrmWebApiService // TODO: implement crm service
  ) {
    this.quote = {
      quoteid: new Guid('16716EE2-2134-E911-80F5-005056A6D254'),
      description: 'configuration JSON',
      name: 'QuoteName'
    }
  }
  // TODO: implement CRUD ops
  @Effect()
  loadQuote$: Observable<Action> = this.actions$.pipe(
    ofType(QuoteActionTypes.LoadQuoteFromCrm),
    mergeMap(action => /*this.crmService.)*/
        of(this.quote).pipe( // TODO: use service
        map(quote => (new LoadQuoteFromCrmSuccessAction(quote))),
        catchError(err => of(new LoadQuoteFromCrmFailureAction(err)))
      )
    )
  );

  @Effect()
  saveQuote$: Observable<Action> = this.actions$.pipe(
    ofType(QuoteActionTypes.SaveQuoteToCrm),
    mergeMap(action => /*this.crmService.)*/
        of('').pipe( // TODO: use service
        map( () => (new SaveQuoteToCrmSuccessAction({ quoteId: new Guid('16716EE2-2134-E911-80F5-005056A6D254')})),
        catchError(err => of(new SaveQuoteToCrmFailureAction(err))))
      )
    )
  );
}