import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from './components/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  public pokemons = signal<SimplePokemon[]>([]);
  public router = inject(Router);
  public title = inject(Title);

  // toSignal Transform  a Observable to a Signal
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((paramMap) => paramMap['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
      tap((page) => console.log(page))
    )
  );

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    { allowSignalWrites: true }
  );
  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   if (isStable) {
  //     this.isLoading.set(false);
  //   }
  // });

  // ngOnInit(): void {
  //   this.loadPokemons();

  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);
  // }

  public loadPokemons(page = 0) {
    this.pokemonsService
      .loadPage(page)
      .pipe(
        // tap(() =>
        //   this.router.navigate([], { queryParams: { page: pageToLoad } })
        // ),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
