import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { QuestionService } from '../services/question.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { QuestionCriteriaDataService } from '../services/question-criteria-data.service';
import { QuestionCriteria } from '../models/question-criteria';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionSearchForm } from '../models/question-search-form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-search',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './question-search.component.html',
})
export class QuestionSearchComponent implements OnInit {

  constructor(private questionService: QuestionService, 
    private questionCriteriaDataService: QuestionCriteriaDataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  categories$: Observable<TriviaCategoriesResponse> | undefined;
  questionSearchForm: FormGroup<QuestionSearchForm>
  questionData: QuestionCriteria | undefined
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
    this.questionSearchForm = this.fb.nonNullable.group(<QuestionSearchForm>({
      amount: new FormControl('', [this.invalidNumber]),
      category: new FormControl(0),
      difficulty: new FormControl(''),
      type: new FormControl('')
    }));
  }

  public search() {
    this.questionData = new QuestionCriteria('5');
    this.questionData.amount = this.questionSearchForm.value.amount ? this.questionSearchForm.value.amount:'';
    this.questionData.category = this.questionSearchForm.value.category ? this.questionSearchForm.value.category:0;
    this.questionData.difficulty = this.questionSearchForm.value.difficulty ? this.questionSearchForm.value.difficulty:'';
    this.questionData.type = this.questionSearchForm.value.type ? this.questionSearchForm.value.type:'';
    this.questionCriteriaDataService.setQuestionCriteria(this.questionData);
    this.router.navigate(['/questions'])
  }

  private invalidNumber(control: AbstractControl) {
    const amount = parseInt(control.value);
    if ((amount > 0 && amount <= 50) || control.value == '') {
      return null
    }

    return { 
      invalidNumber: true
    }

  }

}
