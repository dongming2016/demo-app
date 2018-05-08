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

  getHeroes () {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes
      })
  }

}
