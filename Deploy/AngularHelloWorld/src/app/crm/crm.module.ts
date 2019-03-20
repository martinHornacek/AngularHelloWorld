import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmComponent } from './crm.component';
import { StoreModule } from '@ngrx/store';
import { quoteReducer } from './store/reducers/quote.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './store/effects/quote.effects';

@NgModule({
  declarations: [CrmComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('quote', quoteReducer),
    //StoreModule.forRoot(quoteReducer),
    EffectsModule.forFeature([QuoteEffects]),
  ]
})
export class CrmModule { }


