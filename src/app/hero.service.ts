import { Injectable } from '@angular/core';
import { Hero } from './model/hero';
import { HEROES } from '../mock/heroes';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl, {})
    .pipe(
      tap(heroes => this.log('feteched heroes')),
      catchError(this.handleError('getHeros', []))
    )
  }

  /**
   * this method generates a function which handle the error.
   * it will be share by all method.
   * Instead of handling the error directly, it returns an error handler function to catchError that 
   * it has configured with both the name of the operation that failed and a safe return value.
   * 
   * to solve the defferent result type it uses the generic type 
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
  private log(message: string) {
    this.messageService.add('HeroService:' + message)
  }

  private heroesUrl = '/myapp/backend/heroes'
  
  getHero(id: string): Observable<Hero> {
    // Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    this.messageService.add('HeroService: fetched hero')
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id ${id}`)),
        catchError(this.handleError<Hero>(`get hero ${id}`))
      )
  }
}
