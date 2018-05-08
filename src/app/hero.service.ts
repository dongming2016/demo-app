import { Injectable } from '@angular/core';
import { Hero } from './model/hero';
import { HEROES } from '../mock/heroes';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES)
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero')
    return of(HEROES.find(hero => hero.id === id))
  }
}
