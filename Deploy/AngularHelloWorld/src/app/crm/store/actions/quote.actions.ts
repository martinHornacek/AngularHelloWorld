import { Action } from '@ngrx/store';
import { Quote } from '../states/quote.states';
import { Guid } from 'xrm-webapi';

export enum QuoteActionTypes {
  // TODO: use better word than [Configuration]
  LoadQuoteFromCrm = '[Configuration] Load Quote From Crm',
  LoadQuoteFromCrmSuccess = '[Configuration] Load Quote From Crm Success',
  LoadQuoteFromCrmFailure = '[Configuration] Load Quote From Crm Failure',

  SaveQuoteToCrm = '[Configuration] Save Quote To CRM',
  SaveQuoteToCrmFailure = '[Configuration] Save Quote To CRM Failure',
  SaveQuoteToCrmSuccess = '[Configuration] Save Quote To CRM Success',
}


/** Load Configuration From Crm */
export class LoadQuoteFromCrmAction implements Action {
  readonly type = QuoteActionTypes.LoadQuoteFromCrm;
  constructor(public payload: { quoteId: string }) { }
}

export class LoadQuoteFromCrmSuccessAction implements Action {
  readonly type = QuoteActionTypes.LoadQuoteFromCrmSuccess;
  constructor(public payload: Quote) { }
}

export class LoadQuoteFromCrmFailureAction implements Action {
  readonly type = QuoteActionTypes.LoadQuoteFromCrmFailure;
  constructor(public payload: { error: any }) { }
}

/** Save Configuration To Crm */
export class SaveQuoteToCrmAction implements Action {
  readonly type = QuoteActionTypes.SaveQuoteToCrm;
  constructor(public payload: { quote: Quote/*ConfigurationState*/ }) { }
}

export class SaveQuoteToCrmSuccessAction implements Action {
  readonly type = QuoteActionTypes.SaveQuoteToCrmSuccess;
  constructor(public payload: { quoteId: Guid }) { }
}

export class SaveQuoteToCrmFailureAction implements Action {
  readonly type = QuoteActionTypes.SaveQuoteToCrmFailure;
  constructor(public payload: { error: any }) { }
}

export type QuoteActions = LoadQuoteFromCrmAction | LoadQuoteFromCrmSuccessAction | LoadQuoteFromCrmFailureAction |
SaveQuoteToCrmAction | SaveQuoteToCrmSuccessAction | SaveQuoteToCrmFailureAction;
