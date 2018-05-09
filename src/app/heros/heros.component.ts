import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero';
import { HeroService } from '../hero.service';
import { element } from 'protractor';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes: Hero[]

  hero: Hero = {
    id: '12',
    name: 'windstorm'
  }

  selectedHero: Hero

  constructor(public heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ id:'', name })
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  deletHero(id: string) {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.heroService.deleteHero(id).subscribe();
  }

  getHeroes () {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes
      })
  }

}
