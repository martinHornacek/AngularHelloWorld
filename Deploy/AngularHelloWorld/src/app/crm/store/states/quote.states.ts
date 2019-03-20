import { EntityState } from '@ngrx/entity';

export interface Quote {
    id: string;
    name: string;
}

export interface QuoteState /*extends EntityState<Quote>*/ {
    // additional entity state properties
     quoteid: string | null;
     name: string;
     quotes: Quote[];
}