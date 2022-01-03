import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }
  //La propiedad searchTerms es un subject(asunto) RxJS.

  // Inserta un término de búsqueda en la secuencia observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //// espere 300ms después de cada pulsación de tecla antes de considerar el término
      debounceTime(300),
      // asegura que se envie una solicitud solo si el texto de filtro cambio
      distinctUntilChanged(),
      // llama al servicio de busqueda por cada termino de busqueda hecha en debounce() y distinctUntilChanged()
      //Cancela y descarta los observables de busqueda anterires, devolviendo solo el utlimo servicio de busqueda observable.
      switchMap((term: string) =>
        this.heroService.searchHeroes(term)),
    )
  }

}
