import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // contiene información sobre la ruta a esta instancia de HeroDetailComponent.
import { Location } from '@angular/common'; //es un servicio angular para interactuar con el navegador. Lo usará más tarde para volver a la vista que navegó aquí.

import { Hero } from '../hero'
import { HeroService } from '../hero.service'; //obtiene los datos del héroe del servidor remoto y este componente los utilizará para mostrar el héroe.

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //snapshot es una imagen estática de la información de la ruta poco despues de que se creo el componente
    //ParamMap es un diccionario de valores de parámetros de ruta extraídos de la URL. La clave "id" devuelve el id del héroe que se va a buscar.
    //Route parameters son siempre string. the function Number de JavaScript convierte la cadena en un número, que es lo que debería ser una identificación de héroe.
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
    // navega hacia atrás un paso en la pila del historial del navegador utilizando el servicio de Location que inyectó anteriormente.
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
