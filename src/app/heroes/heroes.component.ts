import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from './mock-heroes'; 
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //heroes = HEROES; //definimos heroes para exponer el array HEROES para la vinculación.
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { } //declaramos el parametro heroService de tipo HeroService

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void { //recupera los datos de getHeroes de heroService y lo guarda en el array heroes.
    this.heroService.getHeroes() //this.heroService.getHeroes() ubicacion del HEROES 
      .subscribe(heroes => this.heroes = heroes); //el metodo susbcribe pasa la matriz emitida a la devolucion de llamda, que establece la propiedad heroes del componente.

  } // este enfoque asincrónico funcionará cuando HeroService solicite héroes al servidor. 
  // (la version actual) espera a que el observable emita la serie de heroes
  // (la version anterior)tiene una forma sincronica lo que significa que se ejecuta despues de otro codigo.
}
