import { HerosComponent } from './heros/heros.component'
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

export const routes: Routes = [
    { path:'', pathMatch:'prefix', redirectTo: 'dashboard'},
    { path: 'heroes', component: HerosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'search', component: HeroSearchComponent}
]
