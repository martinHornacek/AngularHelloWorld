import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { XrmWebApiService } from '../../services/xrmwebapi.service';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { QuoteActionTypes, LoadQuoteFromCrmSuccessAction } from '../actions/quote.actions';


@Injectable()
export class QuoteEffects {
  constructor(
    private actions$: Actions,
    private crmService: XrmWebApiService // TODO: implement crm service
  ) {}

  // TODO: implement CRUD ops
  @Effect()
  loadQuote$: Observable<Action> = this.actions$.pipe(
    ofType(QuoteActionTypes.LoadQuoteFromCrm),
    mergeMap(action => /*this.crmService.)*/
        of("I'm an Quote observable").pipe( // TODO: use service
        map(quoteName => (new LoadQuoteFromCrmSuccessAction({ id: "2", name: quoteName }))),
        //catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  )
}