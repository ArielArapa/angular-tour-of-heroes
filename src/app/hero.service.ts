import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './heroes/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> { //metodo getHeroes con tipo Hero{name: string, id: number} que retorna la lista de HEROES
    const heroes = of(HEROES); //of(HEROES) returna un Observable<Hero[]> que emite un valor único, la matriz de heroes simulados.
    this.messageService.add('HeroService: fetched heroes')
    return heroes;
  }
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
