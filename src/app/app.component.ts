import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, CommonModule } from '@angular/common';
import { QuestionService } from './question.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [QuestionService]
})
export class AppComponent implements OnInit {
 title = 'trivia-game';
  test = 'running';
  response$: Observable<any> | undefined;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestion()
  }

  public newQuestion() {
    this.response$ = this.questionService.getQuestions();
  }
}
