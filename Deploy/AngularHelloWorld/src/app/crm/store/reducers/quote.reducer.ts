import { Quote, QuoteState } from '../states/quote.states';
import { QuoteActions, QuoteActionTypes } from '../actions/quote.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState: QuoteState = {
    quoteid: '1',
    name: 'Default Quote',
    quotes: [{id: '1', name: 'Default Quote'}]
};

export function quoteReducer(state = initialState, action: QuoteActions): QuoteState {
    switch (action.type) {
        case QuoteActionTypes.LoadQuoteFromCrmSuccess:
            return {
                ...state,
                quoteid: action.payload.id,
                name: action.payload.name,
                quotes: [...state.quotes, action.payload]
            };
        default:
            return state;
    }
}