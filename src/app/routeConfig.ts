import { HerosComponent } from './heros/heros.component'
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

export const routes: Routes = [
    { path:'', pathMatch:'prefix', redirectTo: 'dashboard'},
    { path: 'heroes', component: HerosComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent }
]
