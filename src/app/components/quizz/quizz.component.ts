import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss',
})
export class QuizzComponent {
  title: string = '';

  questions: any = [];
  questionSelected: any = {};

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  results: string = '';

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }
  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }
  nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      if (
        this.contarStringsIguais(this.answers, 'A') >
        this.contarStringsIguais(this.answers, 'B')
      ) {
        this.answerSelected = quizz_questions.results.A;
        this.results = 'positivo';
      } else {
        this.answerSelected = quizz_questions.results.B;
        this.results = 'negativo';
      }
    }
  }
  contarStringsIguais(array: string[], valor: string) {
    return array.filter((e) => e == valor).length;
  }
  voltar() {
    this.finished = false;
    this.questionIndex = 0;
    this.finished = false;

    this.title = quizz_questions.title;

    this.questions = quizz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex];

    this.questionMaxIndex = this.questions.length;
  }
}
