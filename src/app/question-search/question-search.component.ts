import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { QuestionService } from '../services/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-search',
  imports: [RouterLink, RouterModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './question-search.component.html',
  styleUrl: './question-search.component.css'
})
export class QuestionSearchComponent implements OnInit {

  constructor(private questionService: QuestionService) {}

  categories$: Observable<TriviaCategoriesResponse> | undefined;

  ngOnInit(): void {
    this.categories$ = this.questionService.getCategories()
  }

}
