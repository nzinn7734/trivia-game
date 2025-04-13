import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    httpClient = TestBed.inject(HttpClient)
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
