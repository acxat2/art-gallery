export enum Holiday {
  holiday = 'holiday',
  birthday = 'birthday',
  artSchool = 'artSchool',
}

export enum ToWhom {
  mother = 'mother',
  father = 'father',
  grandmother = 'grandmother',
  brother = 'brother',
  lelya = 'lelya',
  another = 'another'
}

export interface IPicture {
  id: number;
  fileName: string;
  name: string;
  year?: number | undefined;
  event?: Holiday;
  toWhom?: ToWhom;
  author: 'Алина' | 'Даниил' | 'Папа';
  admin?: boolean
}

export const gallery: IPicture[] = [
  {
    id: 1,
    name: '08.03.2023 маме',
    fileName: '08.03.2023 маме.jpg',
    event: Holiday.holiday,
    toWhom: ToWhom.mother,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 2,
    name: '17.02.2023 День свадьбы',
    fileName: '17.02.2023 День свадьбы.jpg',
    event: Holiday.holiday,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 3,
    name: '23 февраля Дане',
    fileName: '23.02.2023 Дане.jpg',
    toWhom: ToWhom.brother,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 4,
    name: '23 февраля папе от Дани',
    fileName: '23.02.2023 папе от Дани.jpg',
    event: Holiday.holiday,
    year: 2023,
    toWhom: ToWhom.father,
    author: 'Даниил'
  },
  {
    id: 5,
    name: '23 февраля папе',
    fileName: '23.02.2023 папе.jpg',
    event: Holiday.holiday,
    year: 2023,
    toWhom: ToWhom.father,
    author: 'Алина'
  },
  {
    id: 6,
    name: 'Девочка на закате',
    fileName: 'IMG-20181102-WA0002.jpg',
    event: Holiday.artSchool,
    year: 2018,
    author: 'Алина'
  },
  {
    id: 7,
    name: 'Пейзаж',
    fileName: 'IMG-20181102-WA0003.jpg',
    event: Holiday.artSchool,
    year: 2018,
    author: 'Алина'
  },
  {
    id: 8,
    name: 'Котик в лесу',
    fileName: 'IMG-20200417-WA0017.jpg',
    event: Holiday.artSchool,
    year: 2020,
    author: 'Алина'
  },
  {
    id: 9,
    name: 'Волк воет на луну',
    fileName: 'IMG-20210208-WA0009.jpg',
    event: Holiday.artSchool,
    year: 2021,
    author: 'Алина'
  },
  {
    id: 10,
    name: 'Лиса в ночном лесу',
    fileName: 'IMG-20210208-WA0010.jpg',
    event: Holiday.artSchool,
    year: 2021,
    author: 'Алина'
  },
  {
    id: 12,
    name: '8 марта бабушке',
    fileName: 'scan 10.jpg',
    event: Holiday.holiday,
    toWhom: ToWhom.grandmother,
    year: 2021,
    author: 'Алина'
  },
  {
    id: 13,
    name: 'День рождения бабушки',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 13.jpg',
    event: Holiday.birthday,
    year: 2022,
    author: 'Алина'
  },
  {
    id: 14,
    name: 'День рождения бабушки',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 14.jpg',
    event: Holiday.birthday,
    year: 2017,
    author: 'Алина'
  },
  {
    id: 15,
    name: 'День матери',
    fileName: 'День Матери 2022.jpg',
    event: Holiday.holiday,
    toWhom: ToWhom.mother,
    year: 2022,
    author: 'Алина'
  },
  {
    id: 16,
    name: 'День соц работника',
    fileName: 'День соц работника 2018.jpg',
    event: Holiday.holiday,
    toWhom: ToWhom.mother,
    year: 2018,
    author: 'Алина'
  },
  {
    id: 17,
    name: 'ДР Дани 10 лет',
    fileName: 'ДР Дани 10 лет.jpg',
    toWhom: ToWhom.brother,
    year: 2023,
    event: Holiday.birthday,
    author: 'Алина'
  },
  {
    id: 18,
    name: 'ДР мамы 36',
    fileName: 'ДР мамы 36 2022.jpg',
    event: Holiday.birthday,
    toWhom: ToWhom.mother,
    year: 2022,
    author: 'Алина'
  },
  {
    id: 19,
    name: 'ДР папы 40',
    fileName: 'ДР папы 40 2022.jpg',
    event: Holiday.birthday,
    toWhom: ToWhom.father,
    year: 2022,
    author: 'Алина'
  },
  {
    id: 20,
    name: 'НГ 2023 Дане',
    fileName: 'НГ 2023 Дане.jpg',
    toWhom: ToWhom.brother,
    year: 2023,
    event: Holiday.holiday,
    author: 'Алина'
  },
  {
    id: 21,
    name: 'НГ 2023 маме',
    fileName: 'НГ 2023 маме.jpg',
    toWhom: ToWhom.mother,
    year: 2023,
    event: Holiday.holiday,
    author: 'Алина'
  },
  {
    id: 22,
    name: 'Снеговик',
    toWhom: ToWhom.mother,
    fileName: 'НГ 2023 от Дани.jpg',
    event: Holiday.holiday,
    year: 2023,
    author: 'Даниил'
  },
  {
    id: 23,
    name: 'НГ 2023',
    fileName: 'НГ 2023.jpg',
    year: 2023,
    event: Holiday.holiday,
    author: 'Алина'
  },
  {
    id: 24,
    name: 'Утриш',
    fileName: 'Утриш 2020.jpg',
    event: Holiday.artSchool,
    year: 2020,
    author: 'Алина'
  },
  {
    id: 25,
    name: 'ДР Лёли 2023',
    fileName: 'ДР Лёли 2023.jpg',
    toWhom: ToWhom.lelya,
    event: Holiday.birthday,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 26,
    name: 'Маме 01.11.2023',
    fileName: 'маме 01.11.2023.jpg',
    toWhom: ToWhom.mother,
    event: Holiday.birthday,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 27,
    name: 'Папе 01.10.2023',
    fileName: 'папе 01.10.2023.jpg',
    toWhom: ToWhom.father,
    event: Holiday.birthday,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 28,
    name: 'День рождения Мамы 38',
    fileName: 'День рождения Мамы 38.jpg',
    toWhom: ToWhom.mother,
    event: Holiday.birthday,
    year: 2024,
    author: 'Алина'
  },

  {
    id: 29,
    name: 'Бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 11.jpg',
    author: 'Алина'
  },
  {
    id: 30,
    name: 'Бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 18.jpg',
    author: 'Даниил'
  },
  {
    id: 31,
    name: 'Бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 19.jpg',
    author: 'Даниил'
  },
  {
    id: 32,
    name: 'Бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 20.jpg',
    author: 'Даниил'
  },
  {
    id: 33,
    name: '8 марта бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 16.jpg',
    event: Holiday.holiday,
    author: 'Даниил'
  },
  {
    id: 34,
    name: 'День рождения бабушки от Дани',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 15.jpg',
    event: Holiday.birthday,
    author: 'Даниил'
  },
  {
    id: 35,
    name: 'День рождения бабушки от Дани',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 17.jpg',
    event: Holiday.birthday,
    author: 'Даниил'
  },
  {
    id: 36,
    name: 'Новый год бабушке',
    toWhom: ToWhom.grandmother,
    fileName: 'scan 12.jpg',
    event: Holiday.holiday,
    year: 2023,
    author: 'Алина'
  },

  {
    id: 37,
    name: 'Девушка с японской обложки',
    fileName: '3.jpg',
    toWhom: ToWhom.another,
    year: 2002,
    author: 'Папа',
    admin: true
  },
  {
    id: 38,
    name: 'Выпускной',
    fileName: '6.jpg',
    toWhom: ToWhom.another,
    year: 2001,
    author: 'Папа'
  },
  {
    id: 39,
    name: 'Девушка с обложки',
    fileName: '8.jpg',
    toWhom: ToWhom.another,
    year: 2002,
    author: 'Папа'
  },
  {
    id: 40,
    name: 'День рождения бабушки',
    toWhom: ToWhom.grandmother,
    fileName: 'grandmather64.jpg',
    event: Holiday.birthday,
    year: 2023,
    author: 'Алина'
  },
  {
    id: 41,
    name: 'День рождения бабушки',
    toWhom: ToWhom.grandmother,
    fileName: 'grandmather65.jpg',
    event: Holiday.birthday,
    year: 2024,
    author: 'Алина'
  },
  {
    id: 42,
    name: 'День рождения папы',
    toWhom: ToWhom.father,
    fileName: 'photo_2024-11-24_17-43-15.jpg',
    event: Holiday.birthday,
    year: 2024,
    author: 'Даниил'
  },
  {
    id: 43,
    name: 'День рождения папы',
    toWhom: ToWhom.father,
    fileName: 'photo_2024-11-24_17-43-15 (2).jpg',
    event: Holiday.birthday,
    year: 2024,
    author: 'Алина'
  },
  {
    id: 44,
    name: 'Дипломная работа',
    fileName: 'IMG_1604.jpg',
    event: Holiday.artSchool,
    year: 2022,
    author: 'Алина'
  },
  {
    id: 45,
    name: 'Письмо солдату ',
    fileName: 'СВО 11.12 .jpg',
    event: Holiday.holiday,
    year: 2024,
    author: 'Даниил'
  },
  {
    id: 46,
    name: 'Новый год 2025',
    fileName: 'нг 2025.jpg',
    event: Holiday.holiday,
    year: 2024,
    author: 'Алина'
  },
]
