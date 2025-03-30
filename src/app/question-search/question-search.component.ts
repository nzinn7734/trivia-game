import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { QuestionService } from '../services/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { QuestionCriteriaDataService } from '../services/question-criteria-data.service';
import { QuestionCriteria } from '../models/question-criteria';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionSearchForm } from '../models/question-search-form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-search',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './question-search.component.html',
  styleUrl: './question-search.component.css'
})
export class QuestionSearchComponent implements OnInit {

  constructor(private questionService: QuestionService, 
    private questionCriteriaDataService: QuestionCriteriaDataService,
    private router: Router
  ) {}

  categories$: Observable<TriviaCategoriesResponse> | undefined;
  questionSearchForm: FormGroup<QuestionSearchForm>
  questionDate: QuestionCriteria | undefined
  difficulties = [
    {
      value: '',
      name: 'Any Difficulty'
    },
    {
      value: 'easy',
      name: 'Easy'
    },
    {
      value: 'medium',
      name: 'Medium'
    },
    {
      value: 'hard',
      name: 'Hard'
    }
  ]
  types = [
    {
      value: '',
      name: 'Any Type'
    },  
    {
      value: 'multiple',
      name: 'Multiple Choice'
    },
    {
      value: 'boolean',
      name: 'Ture/False'
    }
  ]

  ngOnInit(): void {
    this.categories$ = this.questionService.getCategories();
    this.questionSearchForm = new FormGroup<QuestionSearchForm>({
      amount: new FormControl('',  {nonNullable: true}),
      category: new FormControl('', {nonNullable: true}),
      difficulty: new FormControl('', {nonNullable: true}),
      type: new FormControl('', {nonNullable: true})
    });
  }

  public search() {
    this.questionDate = new QuestionCriteria('5');
    this.questionCriteriaDataService.setQuestionCriteria(this.questionDate);
    this.router.navigate(['/questions'])
  }

}
