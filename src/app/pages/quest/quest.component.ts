import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Quest, quests } from '../../../base/quest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../base/users';

@Component({
  selector: 'app-quest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.css'
})
export class QuestComponent {
  public user!: User;
  public userName$: Observable<string>;
  private greeting = true;
  public greeting$ = new BehaviorSubject<boolean>(this.greeting);
  private count: string | number = 5;
  public count$ = new BehaviorSubject<number | string>(this.count);
  private countdown = false;
  public countdown$ = new BehaviorSubject<boolean>(this.countdown);
  private quest = false;
  public quest$ = new BehaviorSubject<boolean>(this.quest);
  public countHint$ = new BehaviorSubject<boolean>(false);
  public hint$ = new BehaviorSubject<boolean>(false);
  private hintText = '';
  public hintText$ = new BehaviorSubject<string>(this.hintText);

  private congratulation = '';
  public congratulationActive$ = new BehaviorSubject<boolean>(false);
  public congratulation$ = new BehaviorSubject<string>(this.congratulation);

  private countH = 0;
  public countH$ = new BehaviorSubject<number>(this.countH);

  public questionsCount = 0;
  public questions: Quest[] = quests;
  public question$ = new BehaviorSubject<Quest>(this.questions[this.questionsCount]);

  public hintBtn$ = new BehaviorSubject<boolean>(false);
  public answerForm: FormGroup = this.fb.group({
    questionAnswer: ['', [
      Validators.required
    ]]
  })

  get fAnswerControl() {
    return this.answerForm.get('questionAnswer')
  }

  public start() {
    this.greeting = false;
    this.greeting$.next(this.greeting)
    this.countdown = true;
    this.countdown$.next(this.countdown);

    this.storage.saveToStorage('questStart', 'true')

    const startTimer = setInterval(() => {
      if (typeof this.count === 'number') {
        this.count--;
        if (!this.count) {
          this.count = 'GO'
        }
        this.count$.next(this.count);
      } else {
        clearInterval(startTimer)
        this.countdown = false;
        this.countdown$.next(this.countdown);
        this.quest = true;
        this.quest$.next(this.quest);
        this.storage.saveToStorage('questionNumber', JSON.stringify(this.questionsCount))
        if (this.questions[this.questionsCount].hint) {
          this.hintBtn$.next(true);
        }
      }
    }, 1000);
  }

  public answer() {
    let question = this.questions[this.questionsCount];
    const right = question.answer;

    const answer = this.fAnswerControl?.value.toLowerCase();
    if (!answer) {
      alert('Вы ничего не ввели');
      return
    }
    if (answer && answer === right) {
      this.fAnswerControl?.reset()
      this.hint$.next(false)

      this.quest = false;
      this.quest$.next(this.quest);

      this.congratulationActive$.next(true);
      this.congratulation = question.greeting;
      this.congratulation$.next(this.congratulation);
      this.hintBtn$.next(false)

      setTimeout(() => {
        this.congratulationActive$.next(false);

        this.countdown = false;
        this.countdown$.next(this.countdown);
        this.questionsCount++;
        question = this.questions[this.questionsCount]
        this.question$.next(question);

        if(this.questions.length > this.questionsCount) {
          this.storage.saveToStorage('questionNumber', JSON.stringify(this.questionsCount))

          if (question && question.hint) {
            this.hintBtn$.next(true)
          }

          this.quest = true;
          this.quest$.next(this.quest);
        } else {
          this.storage.saveToStorage('questionNumber', JSON.stringify(0))
          this.storage.saveToStorage('questStart', JSON.stringify(false))

          this.congratulationActive$.next(true)
        }
      }, 2000)
    } else {
      alert('Попробуй ещё');
    }
  }

  public hintActive() {
    this.hintBtn$.next(false)
    collHint(
      this.questions[this.questionsCount],
      this.countH,
      this.countH$,
      this.countHint$,
      this.hint$,
      this.hintText,
      this.hintText$
    )
  }

  public clear() {
    this.storage.clearStorage()
  }

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private fb: FormBuilder
  ) {
    this.userName$ = this.authService.userName$;
    const userStorage =  this.storage.getFromStorage('art-studio');
    if (userStorage) {this.user = JSON.parse(userStorage)}
    const questStart = storage.getFromStorage('questStart');
    const questionNumber = storage.getFromStorage('questionNumber');
    if (questionNumber) {
      this.questionsCount = JSON.parse(questionNumber);

      if (this.questions[this.questionsCount].hint) {
        this.hintBtn$.next(true);
      }

      this.question$.next(this.questions[this.questionsCount]);
    }

    if (questStart && JSON.parse(questStart) === true) {
      this.greeting = false;
      this.greeting$.next(this.greeting);
      this.countdown = false;
      this.countdown$.next(this.countdown);
      this.quest = true;
      this.quest$.next(this.quest)
    }
  }
}

function collHint(
  question: Quest,
  countH: number,
  countH$: BehaviorSubject<number>,
  countHint$: BehaviorSubject<boolean>,
  hint$: BehaviorSubject<boolean>,
  hintText: string,
  hintText$: BehaviorSubject<string>
) {
  countH = 180
  countH$.next(countH);
  countHint$.next(true);

  let hintTimer = setInterval(() => {
    if (countH > 0) {
      countH--
      countH$.next(countH);
    } else {
      countHint$.next(false)
    }
  }, 1000)

  setTimeout(() => {
    clearInterval(hintTimer);
    countHint$.next(false);

    hint$.next(true);
    if (question.hint) {
      hintText = question.hint;
      hintText$.next(hintText);
    }
  }, countH * 1000)
}
