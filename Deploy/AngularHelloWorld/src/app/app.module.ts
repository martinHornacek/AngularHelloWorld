import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';
import { CrmService } from './crm.service';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CrmModule } from './crm/crm.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    CrmModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, CrmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
