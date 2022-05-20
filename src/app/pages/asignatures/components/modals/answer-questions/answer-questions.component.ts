import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss']
})
export class AnswerQuestionsComponent implements OnInit {

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
