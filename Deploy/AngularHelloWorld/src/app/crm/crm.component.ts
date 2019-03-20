import { Component, OnInit } from '@angular/core';
import { Quote } from './store/states/quote.states';
import { Store } from '@ngrx/store';
import { LoadQuoteFromCrmAction } from './store/actions/quote.actions';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  constructor(private store : Store<Quote>) { }
  private quote : Quote;
  ngOnInit() {
    //this.store.dispatch(new LoadQuoteFromCrmAction({ quoteId: "16716EE2-2134-E911-80F5-005056A6D254" }));
  }
}
