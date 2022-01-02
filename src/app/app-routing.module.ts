import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//router
import { HeroesComponent } from './heroes/heroes.component'; //le dará al enrutador un lugar adonde ir una vez que configure las rutas.
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [ // las rutas les dicen al enrutador que vista mostrar cuando muestran 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, // Los dos puntos (:) en la ruta indican que: id es un marcador de posición para un id de héroe específico.
  //path: una cadena que coincide con la URL en la barra de direcciones del navegador
  //component: el compoenete que el enrutador debe crear al navegar a esta ruta. 
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)], //forRoot crea un NgModule que contiene todas las directivas, las rutas dadas y el propio servicio de enrutador
  //La siguiente línea agrega el RouterModule al arreglo de importaciones de AppRoutingModule y lo configura con las rutas en un paso llamando a RouterModule.forRoot ():
  exports: [RouterModule]
})

export class AppRoutingModule { }
