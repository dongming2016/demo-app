import { Injectable } from '@angular/core';
import { Hero } from './model/hero';
import { HEROES } from '../mock/heroes';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable()
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.hnadleError('getHeros', []))
    )
  }

  private hnadleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
  private log(message: string) {
    this.messageService.add('HeroService:' + message)
  }

  private heroesUrl = 'api/heroes'
  
  getHero(id: string): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero')
    return of(HEROES.find(hero => hero.id === id))
  }
}
