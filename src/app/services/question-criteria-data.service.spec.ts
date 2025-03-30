import { TestBed } from '@angular/core/testing';

import { QuestionCriteriaDataService } from './question-criteria-data.service';

describe('QuestionCriteriaDataService', () => {
  let service: QuestionCriteriaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCriteriaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
