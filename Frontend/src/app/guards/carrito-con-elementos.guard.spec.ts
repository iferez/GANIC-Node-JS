import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carritoConElementosGuard } from './carrito-con-elementos.guard';

describe('carritoConElementosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carritoConElementosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
