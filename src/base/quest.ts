export type Quest = {
  id: number;
  text: string;
  answer?: string;
  hint?: string;
  placeholder?: string;
  comment?: string;
  greeting: string;
}

export const quests: Quest[] = [
  {
    id: 1,
    text: 'Наши дети на главной странице подскажут, где первая загадка',
    answer: 'брейк',
    comment: 'Какой танец танцевал Даня',
    greeting: 'В точку!'
  },
  {
    id: 2,
    text: 'Без чего у нас дома не закрутить шуруп в стену? В комплекте будет ключь',
    answer: 'муха',
    comment: '-- ..- .... .-',
    greeting: 'Ты молодец!'
  },
  {
    id: 3,
    text: 'В туалете есть потайное место, куда можно кое что положить и никто это не найдёт.',
    answer: 'титаник',
    // hint: 'Подсказка 2',
    comment: 'Наш любимый ресторан в Челябинске, в который мы больше не сходим',
    greeting: 'Ностальжи... Умничка!'
  },
  {
    id: 4,
    text: 'Без чего у нас не обходится новый год? Найди это и найдёшь следующий ключ',
    answer: '.-.-',
    hint: '1 буква',
    comment: 'мандарины "Кто ты? По Морзе" Подсказка 1 буква ( морзе "я")',
    greeting: 'Ну ты крутая!'
  },
  {
    id: 5,
    text: 'Если постоянно себя мотивировать, то "Всё получится"',
    answer: 'кофе',
    // hint: 'Подсказка 4'
    comment: 'За чем мы бегаем по утрам? кофе',
    greeting: 'Поздравляю, Вы прошли все задания. Вам осталось найти главный подарок. Ищи в самой северной комнате, восточной её части... Мы в тебя верим!!!'
  },
  // {
  //   id: 5,
  //   text: 'Вопрос 5',
  //   answer: '5',
  //   // hint: 'Подсказка 5'
  //   greeting: 'Прекрасно!'
  // },
]
