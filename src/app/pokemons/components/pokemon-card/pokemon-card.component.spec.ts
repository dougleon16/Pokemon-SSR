import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const pokemonImageElement = compiled.querySelector('img');
    const pokemonImageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`;
    const pokemonNameElement = compiled.querySelector('h2');

    expect(pokemonImageElement).toBeDefined();
    expect(pokemonImageElement!.src).toBe(pokemonImageSrc);
    expect(pokemonNameElement!.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const routerLink = compiled.querySelector('[ng-reflect-router-link]');
    const routerLinkValue = routerLink?.getAttribute('ng-reflect-router-link');

    expect(routerLink).not.toBeNull();
    expect(routerLinkValue).toBe(`/pokemons,${mockPokemon.name}`);
  });
});
