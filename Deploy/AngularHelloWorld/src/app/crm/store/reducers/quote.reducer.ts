import { CrmState } from '../states/quote.states';
import { QuoteActions, QuoteActionTypes } from '../actions/quote.actions';

// const initialState: QuoteState = {
//     quoteid: '1',
//     name: 'Default Quote',
//     quotes: [{id: '1', name: 'Default Quote'}]
// };

const initialState: CrmState = {
    loadedQuote: null,
    modifiedQuote: null,
    error: null
};

export function quoteReducer(state = initialState, action: QuoteActions): CrmState {
    switch (action.type) {
        case QuoteActionTypes.LoadQuoteFromCrmSuccess:
            return {
                ...state,
                loadedQuote: action.payload,
                modifiedQuote: action.payload
            };
        case QuoteActionTypes.LoadQuoteFromCrmFailure:
            return {
                ...state,
                loadedQuote: null,
                modifiedQuote: null,
                error: action.payload
            };
        case QuoteActionTypes.SaveQuoteToCrmSuccess:
            return {
                ...state,
                loadedQuote: JSON.parse(JSON.stringify(state.modifiedQuote)), // quick attempt for deep copy, TODO: rework
                error: 'saved!'
            };
        default:
            return state;
    }
}
