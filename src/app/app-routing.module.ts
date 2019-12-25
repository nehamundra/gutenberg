import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenreComponent } from './genre/genre.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'genre', component: GenreComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo:'home' ,pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
