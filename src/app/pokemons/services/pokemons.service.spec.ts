import { TestBed } from '@angular/core/testing';

import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokemonAPIResponse, SimplePokemon } from '../interfaces';
import { catchError, of } from 'rxjs';

const mockPokeApiResponse: PokemonAPIResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

const mockPokemon = {
  id: 1,
  name: 'Bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should laod a page of simplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should laod a page  5 of simplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  it('should load pokemon by ID', () => {
    const pokemonId = '1';
    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load pokemon by name', () => {
    const pokemonName = 'pikachu';
    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  // Disparar errores

  it('should catch error ik pokemon not found', () => {
    const pokemonName = 'pokemon-not-found';
    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain('not found');
          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(req.request.method).toBe('GET');
    req.flush('not found', { status: 404, statusText: 'Not Found' });
  });
});
