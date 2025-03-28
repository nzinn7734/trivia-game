import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, mergeMap, toArray } from 'rxjs';
import { TriviaResponse } from '../models/trivia-response';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { TokenResponse } from '../models/token-response';
import { Question } from '../models/question';
import { Result } from '../models/result';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http: HttpClient) { }

  private sessionToken: string;
  private baseTriviaUrl: string = "https://opentdb.com/";
  private triviaCategoriesUrl: string = this.baseTriviaUrl.concat("api_category.php");
  private triviaTokenUrl: string = this.baseTriviaUrl.concat("api_token.php");
  private triviaApiUrl: string = this.baseTriviaUrl.concat("api.php");
  private numberOfQuestions: string = "4";

  getQuestionsObservable(): Observable<Question[]> {
    return this.getQuestions().pipe(
      map((response) => response.results),
      mergeMap(results => results),
      map(result => this.newQuestion(result)),
      toArray())
  }

  getCategories(): Observable<TriviaCategoriesResponse> {
    return this.http.get<TriviaCategoriesResponse>(this.triviaCategoriesUrl);
  }

  private getQuestions(): Observable<TriviaResponse> {
    const queryParams = new HttpParams().set('amount', this.numberOfQuestions);
    if(this.sessionToken === undefined) {
      return this.getTriviaSessionToken().pipe(
        mergeMap((tokenResponse) => 
            this.http.get<TriviaResponse>(this.triviaApiUrl, {params: queryParams.set('token', tokenResponse.token)})
        )
      )
    } else {
      queryParams.set('token', this.sessionToken)
      return this.http.get<TriviaResponse>(this.triviaApiUrl, {params: queryParams});
    }   
  }

  private newQuestion(result: Result): Question {
    return new Question(
      result.type,
      result.difficulty,
      result.category,
      result.question,
      this.newAnswers(result.correct_answer, result.incorrect_answers)
    )
  }

  private newAnswers(correctAnswer: string, incorrectAnswers: string[]): Answer[] {
    let answers: Answer[] = [];
    answers.push(new Answer(true, correctAnswer));
    incorrectAnswers.forEach((answer) => {
      answers.push(new Answer(false, answer));
    })
    return answers;
  }

  private getTriviaSessionToken(): Observable<TokenResponse> {
    const queryParams = new HttpParams().set('command','request');
    return this.http.get<TokenResponse>(this.triviaTokenUrl, {params: queryParams}).pipe(
      tap((response) => this.sessionToken = response.token),
    )
  }
}
