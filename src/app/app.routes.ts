import { Routes } from '@angular/router';
import { QuestionSearchComponent } from './question-search/question-search.component';
import { QuestionsComponent } from './questions/questions.component';

export const routes: Routes = [
    {path: 'question-search', component: QuestionSearchComponent},
    {path: 'questions', component: QuestionsComponent}, 
    {path: '', redirectTo: '/question-search', pathMatch: 'full'},
];
