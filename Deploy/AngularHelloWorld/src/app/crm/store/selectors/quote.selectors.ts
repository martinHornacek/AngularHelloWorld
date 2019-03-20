import { Quote, QuoteState } from '../states/quote.states';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// export function selectQuoteId(a: Quote): string {
//     return a.id;
// }

export const getQuoteState = createFeatureSelector<QuoteState>('quote'); // TODO: rework :D

export const getQuoteName = createSelector(getQuoteState, s => s.name)