import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'Bulbasaur',
  },
  {
    id: '2',
    name: 'Ivysaur',
  },
];
describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemons card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      mockPokemons.length
    );
  });

  it('should render "No hay pokemons" when the list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const noPokemonsMessage = compiled.querySelector('div');
    expect(noPokemonsMessage).toBeDefined();
    expect(noPokemonsMessage!.textContent?.trim()).toBe('No hay pokemons');
  });
});
