import { EntityState } from '@ngrx/entity';
import { Guid } from 'xrm-webapi';

export interface Quote {
    quoteid: Guid;
    name: string;
    description: string; // temp solution, to be replaced by sth else (custom entity?)
}

export interface QuoteDetail {
    quotedetailid: Guid;
    name: string;
    quantity: number;
}

export interface Mainproduct extends QuoteDetail {
    subproducts: Subproduct[];
    configurationState: string; // TODO: use type from epc-client code
}

export interface Subproduct extends QuoteDetail {
    new_parentproductidentifier: string; // not sure if needed, we'll see
}

// export interface QuoteState /*extends EntityState<Quote>*/ {
//     // additional entity state properties
//      quoteid: string | null;
//      name: string;
//      quotes: Quote[];
// }

export interface CrmState {
    loadedQuote: Quote;
    modifiedQuote: Quote;
    error: any;
}
