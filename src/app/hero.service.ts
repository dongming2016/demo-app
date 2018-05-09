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

  addHero(hero:Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`),
      catchError(this.handleError<Hero>('addHero'))
    ))
  }

  deleteHero(hero: Hero|string): Observable<any> {
    // 增加一定的容错。
    const id = typeof hero === 'string' ? hero : hero.id;
    return this.http.delete<any>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`deleted hero id ${id}`)),
      catchError(this.handleError(`delete hero ${id}`))
    );
  }

  searchHeros(name: String): Observable<Hero[]> {
    // 输入为空时做控制。
    if (!name.trim()) {
      return of([]);
    } 
    return this.http.get<Hero[]>(`${this.heroesUrl}/search?name=${name}`).pipe(
      tap(_ => this.log(`searched hero id ${name}`)),
      catchError(this.handleError<Hero[]>(`searched hero ${name}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<Hero>(`${this.heroesUrl}`, hero).pipe(
      tap(hero => this.log(`updated hero ${hero.name}`)),
      catchError(this.handleError<any>(`update hero ${hero.name}`))
    )
  }

}
