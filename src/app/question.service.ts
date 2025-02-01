import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  response: any;

  getQuestions(): Observable<any> {
    return this.http.get("https://opentdb.com/api.php?amount=1").pipe(first());
  }
}
