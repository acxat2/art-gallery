export type NewYear = {
  id?: number;
  text: string;
  picture?: string;
  answer?: string;
  hint?: string;
  placeholder?: string;
  comment?: string;
  greeting: string;
}

export const newYearQuest: NewYear[] = [
  {
    id: 1,
    text: 'Год какого животного сейчас наступил?',
    answer: 'змея',
    greeting: 'Правильно!'
  },
  {
    id: 2,
    text: 'Теперь на английском',
    placeholder: 'Enter the answer to continue',
    answer: 'snake',
    greeting: 'Excellent!'
  },
  {
    id: 3,
    text: 'А сейчас на немецком',
    placeholder:'Одним словом, без артикля',
    answer: 'schlange',
    greeting: 'Вот это поворот...'
  },
  {
    id: 4,
    text: 'Какой известный фильм получится, если сложить эти картинки?',
    picture: 'assets/pictures/newyear/par.jpg',
    placeholder:'Полное название',
    answer: 'ирония судьбы или с легким паром',
    greeting: 'Правильно! Сложно не угадать'
  },
  {
    id: 5,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/1doma.jpg',
    placeholder:'Полное название',
    answer: '1 дома',
    greeting: 'Правильно!'
  },
  {
    id: 6,
    text: 'Угадай сказку',
    picture: 'assets/pictures/newyear/12.jpg',
    placeholder:'Полное название',
    answer: '12 месяцев',
    greeting: 'Правильно!'
  },
  {
    id: 7,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/ivan.jpg',
    placeholder:'Полное название',
    answer: 'иван васильевич меняет профессию',
    greeting: 'Молодец! Сложно было?'
  },
  {
    id: 8,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/udacha.jpg',
    placeholder:'Полное название',
    answer: 'джентльмены удачи',
    greeting: 'Правильно!'
  },
  {
    id: 10,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/karnaval.jpg',
    placeholder:'Полное название',
    answer: 'карнавальная ночь',
    hint: 'Здесь явно присутствует карнавал',
    greeting: 'Правильно! А ты знаток советского кино.'
  },
  {
    id: 9,
    text: 'Угадай мультфильм. Дети должны узнать',
    picture: 'assets/pictures/newyear/heart.jpg',
    placeholder:'Полное название',
    answer: 'холодное сердце',
    greeting: 'Правильно!'
  },
  {
    id: 11,
    text: 'Внимание конкурс! Все гости получают по целому мандарину и по команде ведущего дружно начинают их чистить, чтобы выложить из долек красивую ёлочку. Победит тот, чья ёлочка появится быстрее. Ниже пример',
    picture: 'assets/pictures/newyear/mandarin.jpg',
    answer: '',
    greeting: 'Мандаринку победителю!'
  },
  {
    id: 12,
    text: 'А теперь проверим на сколько вы культурно образованы. Узнаешь картину? Напиши название',
    picture: 'assets/pictures/newyear/peach.jpg',
    placeholder:'Название картины',
    hint: 'Художник Валентин Серов',
    answer: 'девочка с персиками',
    greeting: 'Молодец! Правильно!'
  },
  {
    id: 13,
    text: '«Девочка с персиками» — картина русского живописца Валентина Серова, написана в 1887 году, хранится в Государственной Третьяковской галерее.',
    answer: '',
    picture: 'assets/pictures/newyear/peach-origin.jpg',
    greeting: 'Продолжаем просвещаться'
  },

  {
    id: 14,
    text: 'А это что за картина?',
    picture: 'assets/pictures/newyear/2-simpsons.jpg',
    placeholder:'Название картины',
    hint: 'Художник Фёдор Решетников',
    answer: 'опять двойка',
    greeting: 'Молодцы!'
  },
  {
    id: 15,
    text: '«Опять двойка» — картина художника Фёдора Решетникова, созданная в 1952 году. Хранится в Третьяковской галерее.',
    answer: '',
    picture: 'assets/pictures/newyear/2-origin.jpg',
    greeting: 'Это ещё не всё'
  },
  {
    id: 16,
    text: 'Постановка какой картины изображена?',
    picture: 'assets/pictures/newyear/madonna-art.jpg',
    placeholder:'Название картины',
    hint: 'Художник Рафаэль Санти',
    answer: 'сикстинская мадонна',
    greeting: 'Молодец! Интернет помог?'
  },
  {
    id: 17,
    text: '«Сиксти́нская Мадо́нна» (итал. Madonna di San Sisto a Piacenza, Sacra Conversazione, Madonna Sistina) — картина итальянского живописца Рафаэля Санти, созданная по заказу папы Юлия II для церкви монастыря Сан-Систо в Пьяченце и известная под разными названиями. С 1754 года находится в Галерее старых мастеров в Дрездене.',
    answer: '',
    picture: 'assets/pictures/newyear/madonna-origin.jpg',
    greeting: 'Прекрасно!'
  },
  {
    id: 18,
    text: 'Узнай картину?',
    picture: 'assets/pictures/newyear/utro-kopatich.jpg',
    placeholder:'Название картины',
    hint: 'Художник Иван Шишкин',
    answer: 'утро в сосновом лесу',
    greeting: 'А медведей в названии и нет'
  },
  {
    id: 19,
    text: '«Утро в сосновом лесу» — картина русских живописцев Ивана Шишкина и Константина Савицкого, написанная в 1889 году Является частью собраний Третьяковской галереи в Москве (инв. 841)',
    answer: '',
    picture: 'assets/pictures/newyear/utro-origin.jpg',
    greeting: 'Вот и окультурились'
  },




  {
    id: 20,
    text: 'А теперь проверим насколько вы внимательны. Чего не хватает на картине?',
    picture: 'assets/pictures/newyear/peach-сlock.jpg',
    placeholder:'1 слово',
    answer: 'часы',
    greeting: 'Молодец! Правильно!'
  },
  {
    id: 21,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/peach-origin.jpg',
    greeting: 'Продолжаем проверять память'
  },

  {
    id: 22,
    text: 'Чего не хватает на картине?',
    picture: 'assets/pictures/newyear/2-calendar.jpg',
    placeholder:'1 слово в именительном падеже',
    answer: 'календарь',
    greeting: 'Правильно!'
  },
  {
    id: 23,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/2-origin.jpg',
    greeting: 'Хорошо идём!'
  },
  {
    id: 24,
    text: 'Чего не хватает на картине?',
    picture: 'assets/pictures/newyear/madonna-angels.jpg',
    placeholder:'1 слово',
    answer: 'ангелочки',
    greeting: 'Точно'
  },
  {
    id: 25,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/madonna-origin.jpg',
    greeting: 'Это ещё не всё'
  },
  {
    id: 26,
    text: 'Чего не хватает на картине?',
    picture: 'assets/pictures/newyear/utro-net.jpg',
    placeholder:'1 слово',
    answer: 'медвежонок',
    greeting: 'Вы очень внимательны'
  },
  {
    id: 27,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/utro-origin.jpg',
    greeting: 'Отличная память'
  },

  {
    id: 28,
    text: 'Немного математики. Реши задачу',
    picture: 'assets/pictures/newyear/20.jpg',
    placeholder:'',
    answer: '20',
    greeting: 'Правильно!'
  },
  {
    id: 29,
    text: 'Реши задачу',
    picture: 'assets/pictures/newyear/22.jpg',
    placeholder:'',
    answer: '22',
    greeting: 'Отлично!'
  },
  {
    id: 30,
    text: 'Вернёмся к фильмам. Угадай мультфильм',
    picture: 'assets/pictures/newyear/madagascar.jpg',
    answer: 'мадагаскар',
    greeting: 'Молодец!'
  },
  {
    id: 31,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/madagascar1.jpg',
    greeting: 'Было просто?'
  },
  {
    id: 32,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/garry.jpg',
    answer: 'гарри поттер',
    greeting: 'Правильно, угадали!'
  },
  {
    id: 33,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/garry1.jpg',
    greeting: 'Просто сказка'
  },
  {
    id: 34,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/evengers.jpg',
    answer: 'мстители',
    placeholder:'одно слово',
    hint: 'В 2019-м этот фильм установил мировой рекорд — он стал самым кассовым в истории. В 2021-м его рекорд побил фильм «Аватар» благодаря повторному прокату в Китае.',
    greeting: 'Правильно, угадали!'
  },
  {
    id: 35,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/evengers1.jpg',
    greeting: 'Идём дальше'
  },
  {
    id: 36,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/gump.jpg',
    answer: 'форрест гамп',
    hint: 'Исполнитель главной роли согласился сниматься в этом фильме с одним условием: все события в картине должны перекликаться с историческими.',
    greeting: 'Правильно!'
  },
  {
    id: 37,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/gump1.jpg',
    greeting: 'Идём дальше'
  },
  {
    id: 38,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/interstellar.jpg',
    answer: 'интерстеллар',
    hint: 'У фильма должен был быть другой режиссер. К проекту прикрепили Стивена Спилберга, но тот в итоге отказался от проекта. Тогда сценарист, которого нанимал Спилберг, предложил студии рассмотреть его брата в качестве режиссера.',
    greeting: 'Правильно!'
  },
  {
    id: 39,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/interstellar1.jpg',
    greeting: 'Продолжаем.'
  },
  {
    id: 40,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/smit.jpg',
    answer: 'мистер и миссис смит',
    hint: 'Актеры, которые исполняли роли главных героев, поженились после съемок. Они стали одной из самых красивых и обсуждаемых пар Голливуда. Они официально развелись в 2019-м и расстроили много фанатов!',
    greeting: 'Правильно!'
  },
  {
    id: 41,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/smit1.jpg',
    greeting: 'Ещё немного.'
  },
  {
    id: 42,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/pirat.jpg',
    answer: 'пираты карибского моря',
    hint: 'Актер, сыгравший главного героя, вдохновлялся образом известного рок-музыканта Кита Ричардса. Звали его "Воробей"',
    greeting: 'Правильно!'
  },
  {
    id: 43,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/pirat1.jpg',
    greeting: 'Скоро фильмы закончатся'
  },
  {
    id: 44,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/1+1.jpg',
    answer: '1 + 1',
    hint: 'Этот фильм снят по документальным событиям. Прототип одного из героев — иммигрант из Алжира. Сейчас он владеет птицефермой и пишет книги.',
    greeting: 'Правильно!'
  },
  {
    id: 45,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/1+11.jpg',
    greeting: 'И на последок.'
  },
  {
    id: 46,
    text: 'Угадай фильм',
    picture: 'assets/pictures/newyear/ono.jpg',
    answer: 'оно',
    hint: 'Эта картина снята по роману известного автора, которого знают по книгам ужасов и детективам.',
    greeting: 'Правильно!'
  },
  {
    id: 47,
    text: '',
    answer: '',
    picture: 'assets/pictures/newyear/ono1.jpg',
    greeting: 'Больше кина не будет.'
  },
  {
    id: 48,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-2.jpg',
    hint: 'Считаем буквы, и записываем только 1 букву',
    answer: 'о',
    greeting: 'Молодец!'
  },
  {
    id: 49,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-3.jpg',
    answer: 'гирлянда',
    greeting: 'Умничка!'
  },
  {
    id: 50,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-4.jpg',
    answer: 'хлопушка',
    greeting: 'Хорошо получается!'
  },
  {
    id: 51,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-6.jpg',
    hint: 'Зелёная, нарядная',
    answer: 'елка',
    greeting: 'Правильно!'
  },
  {
    id: 52,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-8.jpg',
    answer: 'хоровод',
    greeting: 'Правильно!'
  },
  {
    id: 53,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-9.jpg',
    answer: 'подарок',
    greeting: 'Все нашли подарки под ёлкой?'
  },
  {
    id: 54,
    text: 'Загадка',
    picture: 'assets/pictures/newyear/vopros-18.jpg',
    answer: 'мешок',
    greeting: 'Вы справились!'
  },

]

// https://docs.google.com/document/d/1Jn6_MUxE_-Is4l5P1U3p2eElP1wfS38U0BHU9kR4qyg/edit
