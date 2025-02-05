import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of, map } from 'rxjs';
import { TriviaResponse } from '../Models/trivia-response';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  triviaResponse: TriviaResponse | undefined;

  getQuestions(): Observable<TriviaResponse> {
    return this.http.get<TriviaResponse>("https://opentdb.com/api.php?amount=4");
  }
}
