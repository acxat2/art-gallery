import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../base/users';
import { NewYear, newYearQuest } from '../../../base/newYear';
import { YearSvgComponent } from '../../components/year-svg/year-svg.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-new-year',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, YearSvgComponent, ModalComponent],
  templateUrl: './new-year.component.html',
  styleUrl: './new-year.component.css'
})
export class NewYearComponent {
  private greeting = true;
  private count: string | number = 0;
  private countdown = false;
  private quest = false;
  private hintText = '';
  public modal: boolean = false;
  public modalText!: string;

  public user!: User;
  public userName$: Observable<string>;
  public greeting$ = new BehaviorSubject<boolean>(this.greeting);
  public count$ = new BehaviorSubject<number | string>(this.count);
  public countdown$ = new BehaviorSubject<boolean>(this.countdown);
  public quest$ = new BehaviorSubject<boolean>(this.quest);
  public countHint$ = new BehaviorSubject<boolean>(false);
  public hint$ = new BehaviorSubject<boolean>(false);
  public hintText$ = new BehaviorSubject<string>(this.hintText);
  public finish$ = new BehaviorSubject<boolean>(false)

  private congratulation = '';
  public congratulationActive$ = new BehaviorSubject<boolean>(false);
  public congratulation$ = new BehaviorSubject<string>(this.congratulation);

  public countH = 0;

  public questionsCount = 0;
  public questions: NewYear[] = newYearQuest;
  public question$ = new BehaviorSubject<NewYear>(this.questions[this.questionsCount]);

  public hintBtn$ = new BehaviorSubject<boolean>(false);
  public answerForm: FormGroup = this.fb.group({
    questionAnswer: ['', [
      Validators.required
    ]]
  })

  get fAnswerControl() {
    return this.answerForm.get('questionAnswer')
  }

  public closeModal() {
    this.modal = false;
  }

  public start() {
    this.greeting = false;
    this.greeting$.next(this.greeting)
    this.countdown = true;
    this.countdown$.next(this.countdown);

    this.storage.saveToStorage('newYearQuestStart', 'true')

    const startTimer = setInterval(() => {
      if (this.count && typeof this.count === 'number') {
        this.count--;
        if (!this.count) {
          this.count = 'Go'
        }
        this.count$.next(this.count);
      } else {
        clearInterval(startTimer)
        this.countdown = false;
        this.countdown$.next(this.countdown);
        this.quest = true;
        this.quest$.next(this.quest);
        this.storage.saveToStorage('questionNumberNewYear', JSON.stringify(this.questionsCount))
        if (this.questions[this.questionsCount].hint) {
          this.hintBtn$.next(true);
        }
      }
    }, 1000);
  }

  public answer() {
    let question = this.questions[this.questionsCount];
    const right = question.answer;

    const answer: string = this.fAnswerControl?.value;

    if (!answer) {
      this.modal = true
      this.modalText = 'Вы ничего не ввели';
      return
    }
    if (answer && answer.toLowerCase().trim().replace(/ё/g, 'е').replace(/\+|плюс/g, ' + ').replace(/ангелы|ангелов|ангелочков/g, 'ангелочки').replace(/один/g, '1').replace(/тарелка|блюдце/g, 'часы').replace(/картина|картинка|плакат/g, 'календарь').replace(/двенадцать/g, '12').replace(/медвежонка|медведь|медведя/g, 'медвежонок').replace(/ +/g, ' ') === right) {
      this.right(question)

    } else {
      this.modal = true
      this.modalText = 'Попробуй ещё';
    }
  }

  public nextt() {
    this.right(this.questions[this.questionsCount])
  }

  private right(question: NewYear) {
    this.hintReset();
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
        this.storage.saveToStorage('questionNumberNewYear', JSON.stringify(this.questionsCount))

        if (question && question.hint) {
          this.hintBtn$.next(true);
        }

        this.quest = true;
        this.quest$.next(this.quest);
      } else {
        this.storage.saveToStorage('questionNumberNewYear', JSON.stringify(0))
        this.storage.saveToStorage('newYearQuestStart', JSON.stringify(false))

        this.congratulationActive$.next(false)
        this.finish$.next(true);
      }
    }, 3000)
  }

  public hintActive() {
    this.countH = 180;
    this.hintBtn$.next(false);
    this.countHint$.next(true);

    const timeOut = setTimeout(() => {
      this.countHint$.next(false);
      const question = this.questions[this.questionsCount]
      this.hint$.next(true);
      if (question.hint) {
        this.hintText = question.hint;
        this.hintText$.next(this.hintText);
      }
    }, this.countH * 1000)

    const counter = setInterval(() => {
      if (this.countH <= 0) {
        clearInterval(counter);
        clearTimeout(timeOut)
      }
      this.countH--
    }, 1000)
  }

  public hintReset() {
    this.countH = 0;

    this.countHint$.next(false);
    setTimeout(() => this.hint$.next(false), 2000)
  }

  public clear() {
    this.storage.clearStorage()
  }

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private fb: FormBuilder,
  ) {
    this.userName$ = this.authService.userName$;
    const userStorage =  this.storage.getFromStorage('art-studio');

    if (userStorage) {
      this.user = JSON.parse(userStorage);
    }

    const newYearQuestStart = storage.getFromStorage('newYearQuestStart');
    const questionNumberNewYear = storage.getFromStorage('questionNumberNewYear');

    if (questionNumberNewYear) {
      this.questionsCount = JSON.parse(questionNumberNewYear);
      this.questionsCount = this.questionsCount >= this.questions.length ? 0 : this.questionsCount

      if (this.questions[this.questionsCount].hint) {
        this.hintBtn$.next(true);
      }

      this.question$.next(this.questions[this.questionsCount]);
    }

    if (newYearQuestStart && JSON.parse(newYearQuestStart) === true) {
      this.greeting = false;
      this.greeting$.next(this.greeting);
      this.countdown = false;
      this.countdown$.next(this.countdown);
      this.quest = true;
      this.quest$.next(this.quest)
    }
  }
}
