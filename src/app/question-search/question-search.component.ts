import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { QuestionService } from '../services/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { QuestionCriteriaDataService } from '../services/question-criteria-data.service';
import { QuestionCriteria } from '../models/question-criteria';

@Component({
  selector: 'app-question-search',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './question-search.component.html',
  styleUrl: './question-search.component.css'
})
export class QuestionSearchComponent implements OnInit {

  constructor(private questionService: QuestionService, 
    private questionCriteriaDataService: QuestionCriteriaDataService,
    private router: Router
  ) {}

  categories$: Observable<TriviaCategoriesResponse> | undefined;
  questionDate: QuestionCriteria | undefined

  ngOnInit(): void {
    this.categories$ = this.questionService.getCategories()
  }

  public search() {
    this.questionDate = new QuestionCriteria('5');
    this.questionCriteriaDataService.setQuestionCriteria(this.questionDate);
    this.router.navigate(['/questions'])
  }

}
