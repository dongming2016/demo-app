import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../model/hero';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // The $ is a convention that indicates heroes$ is an Observable, not an array.
  heroes$: Observable<Hero[]>;

  // subject is an observable.you can subscribe to a subject.this is done by the pipe async.
  private searchTerms$ = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms$.next(term);
  }

  ngOnInit(): void {
    // subscibe to the subject.
    this.heroes$ = this.searchTerms$.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroService.searchHeros(term))
    );
  }

}
