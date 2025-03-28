import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-search',
  imports: [RouterLink, RouterModule],
  templateUrl: './question-search.component.html',
  styleUrl: './question-search.component.css'
})
export class QuestionSearchComponent implements OnInit {
  ngOnInit(): void {
    console.log("started")
  }

}
