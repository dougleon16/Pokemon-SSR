import { TestBed } from '@angular/core/testing';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    // nos permite navegar a la rutaa
    router = TestBed.inject(Router);
    // nos permite verificar si navegamos a la ruta
    location = TestBed.inject(Location);
  });

  it('should navigate to "pokemons" redirects to "/pokemons/page/1"', async () => {
    await router.navigate(['pokemons/page/1']);
    expect(location.path()).toBe('/pokemons/page/1');
  });
  it('should navigate to "pokemons/bulbasaur" redirects to "/pokemons/bulbasaur"', async () => {
    await router.navigate(['pokemons/bulbasaur']);
    expect(location.path()).toBe('/pokemons/bulbasaur');
  });
  it('should navigate to "about" redirects to "/about"', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "contact" redirects to "/contact"', async () => {
    await router.navigate(['contact']);
    expect(location.path()).toBe('/contact');
  });

  it('should navigate to "pricing" redirects to "/pricing"', async () => {
    await router.navigate(['pricing']);
    expect(location.path()).toBe('/pricing');
  });

  it('should navigate to "unknown-page" redirects to "/about"', async () => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/about');
  });

  it('should  load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;

    expect(aboutRoute).toBeDefined();

    const aboutComponent = (await aboutRoute.loadComponent!()) as any;

    expect(aboutComponent.default.name).toBe('AboutPageComponent');
  });
});
