import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Heroi } from '../Models/Herois';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService<Heroi> = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
