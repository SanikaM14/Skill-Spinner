import { TestBed } from '@angular/core/testing';

import { SkillProgressService } from './skill-progress.service';

describe('SkillProgressService', () => {
  let service: SkillProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
