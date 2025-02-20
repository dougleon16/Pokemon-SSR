import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);
  public readonly pokemonService = inject(PokemonsService);
  public readonly title = inject(Title);
  public readonly meta = inject(Meta);
  public route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadPokemon(id);
  }

  private loadPokemon(id: string) {
    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Pagina del Pokemon ${name}`;
          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          });
        })
      )
      .subscribe((pokemon) => {
        this.pokemon.set(pokemon);
      });
  }
}
