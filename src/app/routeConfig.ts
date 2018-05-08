import { HerosComponent } from './heros/heros.component'
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path:'', pathMatch:'prefix', redirectTo: 'heroes'},
    { path: 'heroes', component: HerosComponent }
]
