import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of, map, tap, mergeMap } from 'rxjs';
import { TriviaResponse } from '../Models/trivia-response';
import { TriviaCategoriesResponse } from '../Models/trivia-categories';
import { TokenResponse } from '../Models/token-response';

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

  getQuestions(): Observable<TriviaResponse> {
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

  getCategories(): Observable<TriviaCategoriesResponse> {
    return this.http.get<TriviaCategoriesResponse>(this.triviaCategoriesUrl);
  }

  private getTriviaSessionToken(): Observable<TokenResponse> {
    const queryParams = new HttpParams().set('command','request');
    return this.http.get<TokenResponse>(this.triviaTokenUrl, {params: queryParams}).pipe(
      tap((response) => this.sessionToken = response.token),
    )
  }
}
