import { TestBed } from '@angular/core/testing';

import { QuestionCriteriaDataService } from './question-criteria-data.service';

describe('QuestionCriteriaDataService', () => {
  let service: QuestionCriteriaDataService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({})
    .compileComponents();
    
    service = TestBed.inject(QuestionCriteriaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
