import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component'
import { HerosComponent } from './heros/heros.component'
import { FormsModule } from '@angular/forms'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { HeroService } from './hero.service'
import { MessageComponent } from './message/message.component'
import { MessageService } from './message.service'
import { AppRoutingModule } from './/app-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component'
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
// import { InMemoryDataServiceService } from './in-memory-data-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataServiceService, { dataEncapsulation: false }
    // )
  ],
  providers: [HeroService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
